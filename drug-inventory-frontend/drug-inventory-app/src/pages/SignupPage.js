import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = ({ role }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const endpoint =
        role === "user"
          ? "http://localhost:8085/auth/user/signup"
          : "http://localhost:8085/auth/vendor/signup";
      
      await axios.post(endpoint, form);
      navigate(`/login/${role}`);
      // Success message will be shown on redirect
    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Registration failed. Please check your information and try again."
      );
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
              {role === "user" ? "Create User Account" : "Vendor Registration"}
            </h2>
            <p className="text-blue-100 text-center text-sm mt-1">
              Register for MediTrack {role === "user" ? "user" : "vendor"} access
            </p>
          </div>
          
          {/* Form */}
          <form className="px-6 py-8" onSubmit={handleSignup}>
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            
            <div className="mb-5">
              <label 
                className="block text-gray-700 text-sm font-medium mb-2" 
                htmlFor="name"
              >
                {role === "user" ? "Full Name" : "Company Name"}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                placeholder={role === "user" ? "Enter Name" : "Acme Pharmaceuticals"}
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-5">
              <label 
                className="block text-gray-700 text-sm font-medium mb-2" 
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-5">
              <label 
                className="block text-gray-700 text-sm font-medium mb-2" 
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>
            
            <div className="mb-5">
              <label 
                className="block text-gray-700 text-sm font-medium mb-2" 
                htmlFor="phone"
              >
                {role === "user" ? "Phone Number" : "Contact Number"}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="+91 123-456789"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-6">
              <label 
                className="block text-gray-700 text-sm font-medium mb-2" 
                htmlFor="address"
              >
                {role === "user" ? "Address" : "Business Address"}
              </label>
              <textarea
                id="address"
                name="address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="123 Main St, East End, 560029"
                value={form.address}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
            
            <div className="flex items-center mb-6">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
              </label>
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
                  {role === "user" ? "Creating Account..." : "Submitting Application..."}
                </span>
              ) : (
                role === "user" ? "Create Account" : "Submit Application"
              )}
            </button>
          </form>
          
          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <Link 
                to={`/login/${role}`}
                className="text-blue-600 hover:text-blue-800 font-medium transition"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
        
        {/* Brand Info */}
        <div className="flex justify-center mt-8">
          <p className="text-gray-500 text-sm text-center">
            MediTrack Pharmacy Solutions - Secure {role === "user" ? "User Registration" : "Vendor Application"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;