import React, { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const VendorSignup = () => {
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", address: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/vendor/signup", form);
      alert("Vendor registered successfully");
      navigate("/vendor/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSignup}>
        <h2 className="text-2xl font-semibold mb-6 text-center">Vendor Signup</h2>
        {["name", "email", "password", "phone", "address"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-2 mb-4 border rounded"
            value={form[field]}
            onChange={handleChange}
            required
          />
        ))}
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default VendorSignup;
