import { useEffect } from "react";
import FloatingShape from "./components/floatingShape";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import Dashboard from "./pages/Dashboard";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Protect routes that require authentication
const ProtectedRoutes = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated){
    return <Navigate to="/login" replace /> 
   }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace /> 
   }

  return children;

  }

// Redirect authenticated users to home page
const RedirectAutheticatedUser = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();

  if(isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />
  }

  return children;
}

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth() // call once on mount
  }, [checkAuth]);

  if(isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-darkblue to-lightblue flex items-center justify-center relative overflow-hidden">
      <FloatingShape color="bg-blue-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-white" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-blue-900" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <Routes>

        <Route path="/" element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
          } 
        />

        <Route path="/signup" element={
          <RedirectAutheticatedUser> 
           <SignUpPage />
          </RedirectAutheticatedUser>
          } 
        />

        <Route path="/login" element={
          <RedirectAutheticatedUser>
            <LoginPage />
          </RedirectAutheticatedUser>
          } 
        />

        <Route path="/verify-email" element={
          <VerifyEmailPage />
          } 
        />

        <Route path="/forgot-password" element={
          <RedirectAutheticatedUser>
             <ForgotPassword />
          </RedirectAutheticatedUser>
          } 
        />

        <Route path="/reset-password/:token" element={
          <RedirectAutheticatedUser>
            <ResetPassword />
          </RedirectAutheticatedUser>
        }
        />

        <Route path="*" element={
          <Navigate to="/" replace />
        }
        />

      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
