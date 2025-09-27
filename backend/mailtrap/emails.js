import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
  const recepient = [{email}]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recepient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification",
    })

    console.log("Email sent successfully", response)
  } catch (error) {
    console.error(`Error sending verification email`, error)
    throw new Error(`Error sending verification email: ${error}`)
  }
}

export const sendWelcomeEmail = async(email, name) => {
  const recipient = [{email}];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "19435f80-722d-4572-92e4-be2b83ef28df",
      template_variables: {
        "company_info_name": "Authentication Project",
        "name": name,
      },
    });
    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email`, error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
}

export const sendPasswordResetEmail = async(email, resetURL) => {
  const receipent = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: receipent,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset"
    })
  } catch (error) {
    console.error(`Error sending password reset email`, error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
}

export const sendResetSuccessEmail = async(email) => {
  const receipent = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: receipent,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Password reset email sent successfully", response);

  } catch (error) {
    console.error(`Error sending password reset email success`, error);
    throw new Error(`Error sending password reset success email: ${email}`);
  }
}