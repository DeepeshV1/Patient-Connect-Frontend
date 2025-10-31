import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Bell, Sun, Moon, User, Menu, X, LogOut, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import { useTheme } from "../../context/ThemeContext";
import logo from "../../assets/logo.png";
import { mockDiagnosisData } from "../../data/mockData"; // ✅ import mock data

const PatientNavbar = ({ isSidebarOpen, toggleSidebar, allPages = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode, accentColor } = useTheme();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const searchRef = useRef(null);
  const accountRef = useRef(null);

  // ✅ Load first account from mock data
  const account = mockDiagnosisData.accounts?.[0] || {
    name: "Unknown User",
    email: "unknown@example.com",
    pfp: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/boy-icon.svg",
  };

  // ✅ Search index
  const fullSearchIndex = [
    ...allPages,
    { title: "My Dashboard", path: "/patient/dashboard", description: "View your health overview", keywords: ["overview", "summary", "insights"] },
    { title: "Appointments", path: "/patient/appointments", description: "Manage appointments", keywords: ["doctor", "schedule", "visit"] },
    { title: "Messages", path: "/patient/messages", description: "Chat with your doctor", keywords: ["chat", "communication", "doctor"] },
    { title: "Prescriptions", path: "/patient/prescriptions", description: "View prescriptions", keywords: ["medication", "pharmacy"] },
    { title: "Lab Reports", path: "/patient/reports", description: "Access your lab results", keywords: ["report", "blood test", "results"] },
    { title: "Settings", path: "/patient/settings", description: "Manage preferences", keywords: ["settings", "account"] },
  ];

  const fuse = new Fuse(fullSearchIndex, {
    keys: ["title", "keywords", "description"],
    includeScore: true,
    threshold: 0.3,
    ignoreLocation: true,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (searchRef.current && !searchRef.current.contains(event.target)) &&
        (accountRef.current && !accountRef.current.contains(event.target))
      ) {
        setShowResults(false);
        setShowAccountMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }
    const searchResults = fuse.search(query);
    setResults(searchResults.map((r) => r.item));
    setShowResults(true);
  }, [query]);

  const handleResultClick = (path) => {
    navigate(path);
    setQuery("");
    setShowResults(false);
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full backdrop-blur-md transition-all duration-500 shadow-sm border-b ${
        darkMode
          ? "bg-gray-900/70 border-gray-800 text-white"
          : "bg-white/80 border-gray-200 text-gray-900"
      }`}
      style={{ "--accent": accentColor }}
    >
      <div className="flex items-center justify-between px-3 sm:px-6 py-0.5">
        {/* === LEFT SECTION === */}
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle */}
          <motion.button
            onClick={toggleSidebar}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="relative p-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: darkMode ? "#1f2937" : "#f3f4f6",
              color: accentColor,
              boxShadow: isSidebarOpen
                ? `0 0 10px 2px ${accentColor}80`
                : `0 0 4px 1px ${accentColor}40`,
            }}
            title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isSidebarOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.25 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.25 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* === LOGO + BRAND === */}
          <motion.div
            onClick={() => navigate("/patient/dashboard")}
            className="flex items-center gap-2 cursor-pointer select-none"
            animate={{ x: isSidebarOpen ? 8 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <motion.img
              src={logo}
              alt="Patient Connect Logo"
              className={`w-10 h-10 sm:w-12 sm:h-12 object-contain transition-all duration-300 ${
                darkMode ? "filter invert brightness-0" : "filter brightness-0"
              }`}
              style={{
                transform: "scale(2)",
                marginRight: "0.25rem",
              }}
            />
            <span
              className="font-semibold tracking-tight transition-colors"
              style={{
                fontSize: "140%",
                color: accentColor,
                textShadow: `0 0 8px ${accentColor}40`,
              }}
            >
              Patient-Connect
            </span>
          </motion.div>
        </div>

        {/* === SEARCH BAR === */}
        <div ref={searchRef} className="relative flex-1 max-w-xl mx-4 hidden sm:flex">
          <div
            className="flex items-center rounded-full border w-full transition-colors duration-300"
            style={{
              backgroundColor: darkMode ? "#1f2937" : "#f3f4f6",
              borderColor: accentColor,
              boxShadow: `0 0 8px ${accentColor}30`,
            }}
          >
            <Search className="ml-3" size={18} style={{ color: accentColor }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search appointments, doctors, reports..."
              className={`w-full px-3 py-2 bg-transparent outline-none rounded-full text-sm ${
                darkMode ? "text-white placeholder-gray-400" : "text-gray-900"
              }`}
            />
          </div>

          <AnimatePresence>
            {showResults && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 3 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className={`absolute mt-10 w-full rounded-lg shadow-xl z-50 max-h-72 overflow-y-auto ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                {results.map((res, i) => (
                  <div
                    key={i}
                    onClick={() => handleResultClick(res.path)}
                    className="px-4 py-2 cursor-pointer transition-all text-sm"
                    style={{ color: accentColor }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = accentColor + "25")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <p className="font-medium">{res.title}</p>
                    <p
                      className={`text-xs mt-0.5 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {res.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* === RIGHT SECTION === */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full transition" style={{ color: accentColor }}>
            <Bell size={20} />
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full transition"
            style={{
              color: accentColor,
              backgroundColor: darkMode ? "#1f2937" : "#f3f4f6",
            }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* === ACCOUNT MENU === */}
          <div className="relative" ref={accountRef}>
            <button
              onClick={() => setShowAccountMenu((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1 rounded-full transition-all"
              style={{
                backgroundColor: darkMode ? "#1f2937" : "#f3f4f6",
                color: accentColor,
              }}
            >
              <img
                src={"https://file.aiquickdraw.com/imgcompressed/img/compressed_d7746146b9490e367412c8e54ea16069.webp"}
                alt="pfp"
                className="w-7 h-7 rounded-full object-cover border"
                style={{ borderColor: accentColor }}
              />
              <span className="text-sm font-medium hidden sm:inline">
                {account.name}
              </span>
            </button>

            <AnimatePresence>
              {showAccountMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 mt-2 w-52 rounded-xl shadow-lg p-3 z-50 ${
                    darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
                  }`}
                >
                  <div className="px-2 pb-2 border-b border-gray-500/20">
                    <p className="font-semibold">{account.name}</p>
                    <p className="text-xs opacity-80">{account.email}</p>
                  </div>

                  <div className="flex flex-col mt-2 text-sm">
                    <button
                      onClick={() => navigate("/patient/account")}
                      className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-500/10"
                    >
                      <User size={16} /> Profile
                    </button>
                    <button
                      onClick={() => navigate("/patient/settings")}
                      className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-500/10"
                    >
                      <Settings size={16} /> Settings
                    </button>
                    <button
                      onClick={() => navigate("/auth")}
                      className="flex items-center gap-2 px-2 py-2 rounded-md text-red-500 hover:bg-red-500/10"
                    >
                      <LogOut size={16} /> Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PatientNavbar;
