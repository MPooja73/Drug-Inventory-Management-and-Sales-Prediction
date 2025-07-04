import React, { useState } from "react";
import { post } from '../api';
import { useAuth } from "../auth/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);
      
      const formattedRole = role === "user" ? "ROLE_USER" : "ROLE_VENDOR";
      
      try {
        const response = await post("/auth/login", {
          email,
          password,
          role: formattedRole,
        });
        
        const { id, name, accessToken, refreshToken } = response;
      login(id, name, email, formattedRole, accessToken);
        
        if (formattedRole === "ROLE_USER") {
          navigate("/dashboard/user");
        } else {
          navigate("/dashboard/vendor");
        }
      } catch (err) {
        console.error("Login failed:", err.response?.data || err.message);
        setError("Invalid credentials or server error.");
      } finally {
        setIsLoading(false);
      }
    };
    
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="w-full max-w-md px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
            <h2 className="text-2xl font-bold text-white text-center">
              {role === "user" ? "User Portal" : "Vendor Portal"}
            </h2>
            <p className="text-blue-100 text-center text-sm mt-1">
              Access your MediTrack {role === "user" ? "user" : "vendor"} account
            </p>
          </div>
          
          {/* Form */}
          <form className="px-6 py-8" onSubmit={handleLogin}>
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            
            <div className="mb-6">
              <label 
                className="block text-gray-700 text-sm font-medium mb-2" 
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label 
                  className="block text-gray-700 text-sm font-medium" 
                  htmlFor="password"
                >
                  Password
                </label>
                {/* <Link 
                  to="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-800 transition"
                >
                  Forgot password?
                </Link> */}
              </div>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="flex items-center mb-6">
              {/* <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              /> */}
              {/* <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me for 30 days
              </label> */}
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          
          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-gray-600 text-sm">
              Not a registered {role}?{" "}
              <Link 
                to={`/signup/${role}`}
                className="text-blue-600 hover:text-blue-800 font-medium transition"
              >
                {role === "user" ? "Register Now" : "Apply Now"}
              </Link>
            </p>
          </div>
        </div>
        
        {/* Brand Logo */}
        <div className="flex justify-center mt-8">
          <p className="text-gray-500 text-sm text-center">
            MediTrack Pharmacy Solutions - Secure {role === "user" ? "User" : "Vendor"} Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;