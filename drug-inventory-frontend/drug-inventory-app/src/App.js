import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Common/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserDashboard from "./pages/User/Dashboard";
import VendorDashboard from "./pages/Vendor/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import EditProfilePage from "./pages/User/EditProfilePage";

function App() {
  return (
    <Routes>
      {/* 🌐 Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login/user" element={<LoginPage role="user" />} />
      <Route path="/login/vendor" element={<LoginPage role="vendor" />} />
      <Route path="/signup/user" element={<SignupPage role="user" />} />
      <Route path="/signup/vendor" element={<SignupPage role="vendor" />} />
      <Route
        path="/user/edit-profile"
        element={
          <ProtectedRoute role="ROLE_USER">
            <EditProfilePage />
          </ProtectedRoute>
  }
/>

      {/* 🔐 Protected Routes */}
      <Route
        path="/dashboard/user"
        element={
          <ProtectedRoute role="ROLE_USER">
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/vendor"
        element={
          <ProtectedRoute role="ROLE_VENDOR">
            <VendorDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
