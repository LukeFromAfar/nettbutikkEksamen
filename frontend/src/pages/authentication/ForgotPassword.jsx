// src/pages/authentication/ForgotPassword.jsx
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`, 
        { email }
      );
      
      setSuccess(true);
      setMessage(res.data.msg);
      setLoading(false);
    } catch (error) {
      setSuccess(false);
      if (error.response) {
        setMessage(error.response.data.msg);
      } else {
        setMessage("An error occurred. Please try again later.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col shadow-xl bg-gray-100 mt-8 rounded-lg p-4 w-1/3">
        <h1 className="pb-4 text-3xl text-center">Reset Password</h1>
        
        {success ? (
          <div>
            <p className="text-center text-green-600 mb-4">{message}</p>
            <p className="text-center">
              <Link to="/sign-in" className="text-blue-500 hover:text-blue-700">
                Return to Login
              </Link>
            </p>
          </div>
        ) : (
          <>
            <p className="mb-4 text-center">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label>
                Email:
                <input 
                  type="email" 
                  className="w-full p-2 mb-3 border rounded" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              
              <button 
                type="submit" 
                className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 self-center mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            
            {message && 
              <p className={`mt-4 text-center ${success ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </p>
            }
            
            <p className="mt-4 text-center text-sm">
              <Link to="/sign-in" className="text-blue-500 hover:text-blue-700">
                Back to Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}