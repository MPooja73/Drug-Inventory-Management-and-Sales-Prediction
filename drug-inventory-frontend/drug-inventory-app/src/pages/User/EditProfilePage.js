import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { put } from '../../api';
import { useAuth } from '../../auth/AuthProvider';

/**
 * This is a simplified version of EditProfilePage that doesn't rely on fetching data
 * Use this as a fallback if the main component isn't working due to API issues
 * Now with styling consistent with LoginPage
 */

const AVATAR_COLORS = [
  'bg-blue-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-yellow-500',
];

function stringToColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length] || 'bg-blue-500';
}

const EditProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-center text-red-600">Error: Not Logged In</h2>
        <p className="text-gray-700 mb-4">You need to be logged in to access this page.</p>
        <button
          onClick={() => navigate('/login/user')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Inline SVG Heroicons for inputs
  const icons = {
    name: (
      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A4.992 4.992 0 0112 15c1.281 0 2.47.486 3.38 1.283M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    phone: (
      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 6h6v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5zm6 5v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5h6zm2-11h6a2 2 0 012 2v5h-2a2 2 0 00-2 2v-1a4 4 0 00-4-4V5a2 2 0 012-2z" />
      </svg>
    ),
    address: (
      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 12.414A2 2 0 0013 11V7a2 2 0 10-4 0v4a2 2 0 00-.586 1.414l-4.243 4.243a8 8 0 1011.314 0z" />
      </svg>
    ),
    password: (
      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c2.21 0 4-1.79 4-4a4 4 0 10-8 0c0 2.21 1.79 4 4 4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 19v-2c0-2.21 1.79-4 4-4s4 1.79 4 4v2M6 19H4a2 2 0 01-2-2v-7a2 2 0 012-2h16a2 2 0 012 2v7a2 2 0 01-2 2h-2" />
      </svg>
    ),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match if provided
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setSuccess('');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Prepare request payload according to backend API
      const updateRequest = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      };

      // Only include password if it's provided
      if (formData.password) {
        updateRequest.password = formData.password;
      }

      console.log("Updating profile for userId:", user.id);
      console.log("Update request payload:", updateRequest);

      // Call the backend API endpoint using our centralized API service
      await put(`/user/update-profile/${user.id}`, updateRequest);

      setSuccess('Profile updated successfully!');
      setLoading(false);

      // Clear password fields after successful update
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));

      // Redirect to user dashboard after a delay
      setTimeout(() => {
        navigate('/dashboard/user');
      }, 2000);

    } catch (err) {
      console.error("Profile update error:", err);
      setLoading(false);
      setError(err.message || 'Failed to update profile. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="w-full max-w-md px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
            <h2 className="text-2xl font-bold text-white text-center">Profile Settings</h2>
            <p className="text-blue-100 text-center text-sm mt-1">Update your MediTrack account information</p>
          </div>
          
          {/* Avatar section */}
          {/* <div className="flex flex-col items-center mt-6">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md ${stringToColor(formData.name)}`}
            >
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <h3 className="text-lg font-medium mt-2 text-gray-800">{user?.name || 'User'}</h3>
          </div> */}

          <form className="px-6 py-8" onSubmit={handleSubmit}>
            {/* Error message */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            
            {/* Success message */}
            {success && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}

            {/* Name input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                Full Name
              </label>
              <div className="flex items-center">
                <span className="text-blue-400 mr-2">{icons.name}</span>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                  id="name"
                  name="name"
                  type="text"
                  // value={formData.name}
                  // onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Phone input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                Phone Number
              </label>
              <div className="flex items-center">
                <span className="text-blue-400 mr-2">{icons.phone}</span>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  placeholder="Your phone number"
                />
              </div>
            </div>

            {/* Address input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">
                Address
              </label>
              <div className="flex items-start">
                <span className="text-blue-400 mr-2 mt-3">{icons.address}</span>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                  id="address"
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                  placeholder="Your street address"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                New Password{' '}
                <span className="text-gray-400 font-normal text-xs">(leave blank to keep current)</span>
              </label>
              <div className="flex items-center">
                <span className="text-blue-400 mr-2">{icons.password}</span>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Confirm password input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <div className="flex items-center">
                <span className="text-blue-400 mr-2">{icons.password}</span>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Button row */}
            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard/user')}
                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
          
          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-gray-600 text-sm">
              Need help? Contact our support team
            </p>
          </div>
        </div>
        
        {/* Brand note */}
        <div className="flex justify-center mt-8">
          <p className="text-gray-500 text-sm text-center">
            MediTrack Pharmacy Solutions - User Profile Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;