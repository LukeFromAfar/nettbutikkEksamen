// src/pages/authentication/ResetPassword.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(true);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    
    setLoading(true);
    setMessage("");
    
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password/${token}`,
        { password }
      );
      
      setSuccess(true);
      setMessage(res.data.msg);
      setLoading(false);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/sign-in");
      }, 3000);
    } catch (error) {
      setSuccess(false);
      if (error.response) {
        setMessage(error.response.data.msg);
        if (error.response.status === 400) {
          setValidToken(false);
        }
      } else {
        setMessage("An error occurred. Please try again later.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col shadow-xl bg-gray-100 mt-8 rounded-lg p-4 w-1/3">
        <h1 className="pb-4 text-3xl text-center">Reset Your Password</h1>
        
        {!validToken ? (
          <div className="text-center">
            <p className="text-red-500 mb-4">This password reset link is invalid or has expired.</p>
            <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700">
              Request a new password reset link
            </Link>
          </div>
        ) : success ? (
          <div className="text-center">
            <p className="text-green-500 mb-4">{message}</p>
            <p>Redirecting to login...</p>
          </div>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label>
              New Password:
              <input 
                type="password" 
                className="w-full p-2 mb-3 border rounded" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </label>
            
            <label>
              Confirm Password:
              <input 
                type="password" 
                className="w-full p-2 mb-3 border rounded" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            
            <button 
              type="submit" 
              className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 self-center mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
            
            {message && (
              <p className={`mt-4 text-center ${success ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}