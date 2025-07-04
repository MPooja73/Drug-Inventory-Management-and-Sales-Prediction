import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SVGComponent from "./svgviewer-react-output";

const Home = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  // Refs for hover detection
  const loginRef = useRef(null);
  const signupRef = useRef(null);
  
  // State to track hover state
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showSignupDropdown, setShowSignupDropdown] = useState(false);
  const [image, setImage] = useState({});

  // Add hover delay timers
  const loginHoverTimer = useRef(null);
  const signupHoverTimer = useRef(null);

  const handleRoleSelect = (role) => {
    navigate(`/signup/${role}`);
    setShowSignupDropdown(false);
  };

  const handleLoginRoleSelect = (role) => {
    navigate(`/login/${role}`);
    setShowLoginDropdown(false);
  };

  // Handle mouse enter with delay
  const handleLoginMouseEnter = () => {
    clearTimeout(loginHoverTimer.current);
    loginHoverTimer.current = setTimeout(() => {
      setShowLoginDropdown(true);
    }, 300); // 300ms delay before showing dropdown
  };

  const handleSignupMouseEnter = () => {
    clearTimeout(signupHoverTimer.current);
    signupHoverTimer.current = setTimeout(() => {
      setShowSignupDropdown(true);
    }, 100); // 300ms delay before showing dropdown
  };

  // Handle mouse leave with delay
  const handleLoginMouseLeave = () => {
    clearTimeout(loginHoverTimer.current);
    loginHoverTimer.current = setTimeout(() => {
      setShowLoginDropdown(false);
    }, 100); // 400ms delay before hiding dropdown
  };

  const handleSignupMouseLeave = () => {
    clearTimeout(signupHoverTimer.current);
    signupHoverTimer.current = setTimeout(() => {
      setShowSignupDropdown(false);
    }, 400); // 400ms delay before hiding dropdown
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setShowLoginDropdown(false);
      }
      if (signupRef.current && !signupRef.current.contains(event.target)) {
        setShowSignupDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Clear any pending timers when component unmounts
      clearTimeout(loginHoverTimer.current);
      clearTimeout(signupHoverTimer.current);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-black to-indigo-900 text-white">
      {/* Navbar */}
      <nav className="backdrop-blur-md bg-gradient-to-r from-blue-500/60 to-blue-700/60 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="/medical-shield.png"
              alt="PharmaTrack Logo"
              className="h-12 w-12 cursor-pointer hover:scale-110 transition-transform duration-300"
            />
            <div className="cursor-pointer hover:scale-105 transition-transform duration-300">
              <h1 className="text-2xl font-extrabold tracking-wide text-white">
                <span className="hidden sm:inline">MediTrack</span>
                <span className="inline sm:hidden">MT</span> Inventory System
              </h1>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4">
            {/* Login Button with Dropdown */}
            <div 
              ref={loginRef}
              className="relative"
              onMouseEnter={handleLoginMouseEnter}
              onMouseLeave={handleLoginMouseLeave}
            >
              <button
                className="hover:bg-blue-800 px-4 py-2 rounded-full border border-blue-300 transition duration-300 text-sm font-medium"
              >
                Login
              </button>
              
              {showLoginDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-blue-700 rounded-md shadow-lg py-1 z-50 transition-opacity duration-300">
                  <button
                    onClick={() => handleLoginRoleSelect('user')}
                    className="block px-4 py-2 text-sm text-white hover:bg-blue-800 w-full text-left"
                  >
                    User
                  </button>
                  <button
                    onClick={() => handleLoginRoleSelect('vendor')}
                    className="block px-4 py-2 text-sm text-white hover:bg-blue-800 w-full text-left"
                  >
                    Vendor
                  </button>
                </div>
              )}
            </div>
            
            {/* Signup Button with Dropdown */}
            <div 
              ref={signupRef}
              className="relative"
              onMouseEnter={handleSignupMouseEnter}
              onMouseLeave={handleSignupMouseLeave}
            >
              <button
                className="hover:bg-blue-800 px-4 py-2 rounded-full border border-blue-300 transition duration-300 text-sm font-medium"
              >
                Signup
              </button>
              
              {showSignupDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-blue-700 rounded-md shadow-lg py-1 z-50 transition-opacity duration-300">
                  <button
                    onClick={() => handleRoleSelect('user')}
                    className="block px-4 py-2 text-sm text-white hover:bg-blue-800 w-full text-left"
                  >
                    User
                  </button>
                  <button
                    onClick={() => handleRoleSelect('vendor')}
                    className="block px-4 py-2 text-sm text-white hover:bg-blue-800 w-full text-left"
                  >
                    Vendor
                  </button>
                </div>
              )}
            </div>
            
            {/* <Link
              to="/drug-search"
              className="hover:bg-blue-800 px-4 py-2 rounded-full border border-blue-300 transition duration-300 text-sm font-medium"
            >
              Drug Searc
            </Link> */}
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <span className="text-2xl font-bold">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div 
            className="md:hidden px-4 pt-2 pb-4 space-y-3 bg-blue-700/80 backdrop-blur-lg shadow-xl rounded-b-2xl mx-4 mt-2 transition-all duration-300"
          >
            {/* Login with nested options */}
            <div className="transition-all duration-300 opacity-100">
              <div className="block w-full text-white text-sm text-center bg-blue-800 hover:bg-blue-900 transition-colors duration-300 px-4 py-2 rounded-t-full border border-blue-300 shadow">
                Login
              </div>
              <div className="bg-blue-600 rounded-b-lg border-x border-b border-blue-300">
                <button
                  onClick={() => {
                    handleLoginRoleSelect('user');
                    setIsOpen(false);
                  }}
                  className="block w-full text-white text-sm text-center hover:bg-blue-700 transition-colors duration-300 px-4 py-2"
                >
                  User
                </button>
                <button
                  onClick={() => {
                    handleLoginRoleSelect('vendor');
                    setIsOpen(false);
                  }}
                  className="block w-full text-white text-sm text-center hover:bg-blue-700 transition-colors duration-300 px-4 py-2 rounded-b-lg"
                >
                  Vendor
                </button>
              </div>
            </div>
            
            {/* Signup with nested options */}
            <div className="transition-all duration-300 opacity-100">
              <div className="block w-full text-white text-sm text-center bg-blue-800 hover:bg-blue-900 transition-colors duration-300 px-4 py-2 rounded-t-full border border-blue-300 shadow">
                Signup
              </div>
              <div className="bg-blue-600 rounded-b-lg border-x border-b border-blue-300">
                <button
                  onClick={() => {
                    handleRoleSelect('user');
                    setIsOpen(false);
                  }}
                  className="block w-full text-white text-sm text-center hover:bg-blue-700 transition-colors duration-300 px-4 py-2"
                >
                  User
                </button>
                <button
                  onClick={() => {
                    handleRoleSelect('vendor');
                    setIsOpen(false);
                  }}
                  className="block w-full text-white text-sm text-center hover:bg-blue-700 transition-colors duration-300 px-4 py-2 rounded-b-lg"
                >
                  Vendor
                </button>
              </div>
            </div>
            
            {/* Drug Search Link */}
            <div className="transition-all duration-300 opacity-100">
              <Link
                to="/drug-search"
                onClick={() => setIsOpen(false)}
                className="block w-full text-white text-sm text-center bg-blue-800 hover:bg-blue-900 transition-colors duration-300 px-4 py-2 rounded-full border border-blue-300 shadow"
              >
                Drug Search
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="flex-grow container mx-auto px-6 py-16">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center opacity-100 transition-opacity duration-500"
        >
          {/* Left */}
          <div className="flex flex-col justify-center items-center -mt-50">
            <h2
              className="text-3xl sm:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200 leading-tight text-center md:text-left transition-transform duration-500"
            >
              Welcome to <br /> Drug <br /> Inventory System
              
              

            </h2
            >
            <SVGComponent className="-m-24" ></SVGComponent>
         
          </div>

          {/* Right */}
          <div className="text-center flex flex-col justify-center items-center">
            <div className="grid grid-cols-1 gap-6 w-full max-w-md">
              {[{
                title: "Inventory Management",
                desc: "Track medications, expiry dates and stock levels.",
                action: "Access",
                route: "/role-based-login",
                icon: "💊",
              }, {
                title: "Order Processing",
                desc: "Process and track procurement orders easily.",
                action: "Orders",
                route: "/drug-search",
                icon: "📦",
              }, {
                title: "Analytics Dashboard",
                desc: "Monitor inventory metrics and generate reports. ",
                action: "Reports",
                route: "/drug-search",
                icon: "📊",
              }].map(({ title, desc, action, route, icon }, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-tr from-indigo-800 to-indigo-700 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 text-left"
                >
                  <div className="text-3xl mb-3">{icon}</div>
                  <h3 className="text-lg font-bold mb-1 text-blue-300">{title}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{desc}</p>
                  {/* <button
                    onClick={() => navigate(route)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    {action}
                  </button> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-800 to-indigo-900 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-blue-300">
                MediTrack Pharmacy Solutions
              </h4>
              <p className="text-sm text-gray-400">
                Simplifying Pharmaceutical Inventory Management
              </p>
            </div>
            <div className="flex space-x-6">
              {['Contact', 'About', 'Privacy Policy'].map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <p className="text-center mt-6 text-xs text-gray-500">
            © 2025 MediTrack Pharmacy Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;