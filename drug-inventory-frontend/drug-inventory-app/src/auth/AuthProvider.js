import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initialize state from localStorage
  const [user, setUser] = useState(() => ({
    id: localStorage.getItem("id"),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
    
  }));

  // Automatically update state when localStorage changes (for reloads)
  useEffect(() => {
    const id = localStorage.getItem("id");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
  
    if (email && role && token) {
      setUser({ id, name, email, role, token });
    }
  }, []);

  const login = (id, name, email, role, token) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    localStorage.setItem("token", token);
    setUser({ id, name, email, role, token });
  };
  // Logout function with useEffect-safe navigate
  const logout = () => {
    localStorage.clear();
    setUser(null);

    // Use a small delay to ensure navigate works after context update
    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
