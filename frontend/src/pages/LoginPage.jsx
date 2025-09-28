import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Mail, Lock, Loader } from 'lucide-react';
import { Link } from "react-router-dom";
import Input from '../components/Input';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = false;
  const handleLogin = (e) => {
    e.preventDefault();
  }

  return (
    <motion.div
           initial={{opacity: 0, y: 20}}
           animate={{opacity: 1, y: 0}}
           transition={{duration: 0.5}}
           className='max-w-md w-full bg-gray-900 bg-opacity-50 backdrop-filter
                      backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='p-8'>
        <h2 className='text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to=blue-700 text-transparent bg-clip-text'>Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <Input
           Icon={Mail}
           type='email'
           placeholder="Email Address"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
        />
        <Input
           Icon={Lock}
           type='password'
           placeholder="Password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
        />
        <div className='flex items-center mb-6'>
          <Link to='forgot-password' className='test-sm text-blue-400 hover:underline'>
             Forgot Password?
          </Link>
        </div>
        <motion.button 
                  className='mt-6 w-full py-3 px-4 bg-gradient-to-r from-blue-400 to-blue-800 text-white
                              font-bold rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-900 focus:outline-none
                              focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-gray-700
                              transition duration-200'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type='submit'
                  disabled={isLoading}
        >
          {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
        </motion.button>
        </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <p className='text-sn text-gray-400'>
              Don't have an account?{" "}
          <Link to={"/signup"} className='text-blue-400 hover:underline'>
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default LoginPage