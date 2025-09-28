import { useState } from 'react'
import FloatingShape from './components/floatingShape';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div className='min-h-screen bg-gradient-to-br from-darkblue to-lightblue flex items-center justify-center relative overflow-hidden'>
      <FloatingShape color="bg-blue-500" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
      <FloatingShape color="bg-white" size="w-48 h-48" top="70%" left="80%" delay={5}/>
      <FloatingShape color="bg-blue-900" size="w-32 h-32" top="40%" left="-10%" delay={2}/>

      <Routes>
        <Route path='/' element={"Home"}/>
        <Route path='/signup' element={<SignUpPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/verify-email' element={<VerifyEmailPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
