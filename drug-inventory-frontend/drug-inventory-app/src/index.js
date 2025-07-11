import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'; 
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
