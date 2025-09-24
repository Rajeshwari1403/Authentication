import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
     if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const userAlreadyexist = await User.findOne({ email });
    console.log("UserAlreadyExists", userAlreadyexist);
    if(userAlreadyexist){
      return res.status(400).json({success: false, message: "User Already Exixts"});
    }

    // Hash the Password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 Hours
    })

    // Save it to the DataBase
    await user.save();

    // jwt 
    generateTokenSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: {
        ...user._doc,
        password: undefined
      },
    });

  } catch (error) {
    res.status(400).json({success: false, message: error.message});
  }
}

export const verifyEmail = async (req, res) => {
  const {code} = req.body;
  try {
    const user = await User.findOne( {
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }
    })

    if(!user){
      return res.status(400).json({success: false, message: "Invalid or expired verification code"})
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

  } catch (error) {
    
  }
}

export const login = async (req, res) => {
  res.send("Login Route");
}

export const logout = async (req, res) => {
  res.send("Logout Route");
}