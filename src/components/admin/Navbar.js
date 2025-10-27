// src/components/admin/Navbar.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Bell, Sun, Moon, User, Menu, X } from "lucide-react";
import Fuse from "fuse.js";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

// ✅ Replace with your logo
const logoUrl = "https://i.ibb.co/YgFJMvx/patient-connect-logo.png";

const Navbar = ({ allPages = [], isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode, accentColor } = useTheme();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // ✅ Augment search data with key categories & keywords
  const fullSearchIndex = [
    ...allPages,
    {
      title: "Dashboard Overview",
      path: "/admin/dashboard",
      category: "Analytics",
      description: "View system overview, charts, and performance insights",
      keywords: ["overview", "charts", "analytics", "stats", "data"],
    },
    {
      title: "Patients Directory",
      path: "/admin/patients",
      category: "Patients",
      description: "Manage patient profiles, appointments, and reports",
      keywords: ["patients", "records", "appointments", "medical history"],
    },
    {
      title: "Doctors",
      path: "/admin/doctors",
      category: "Doctors",
      description: "View and manage doctor accounts and schedules",
      keywords: ["doctors", "physicians", "consultants", "specialists"],
    },
    {
      title: "Messages",
      path: "/admin/messages",
      category: "Communication",
      description: "View patient-doctor chat history and send messages",
      keywords: ["messages", "communication", "chat", "conversation"],
    },
    {
      title: "Reminders",
      path: "/admin/reminders",
      category: "Notifications",
      description: "Manage medication and appointment reminders",
      keywords: ["reminder", "alerts", "notifications", "schedule"],
    },
    {
      title: "Reports & Analytics",
      path: "/admin/reports",
      category: "Reports",
      description: "Monitor doctor performance, patient visits, and sales",
      keywords: ["analytics", "reports", "sales", "data", "insights"],
    },
    {
      title: "Settings",
      path: "/admin/settings",
      category: "System",
      description: "Change theme, accent color, and profile settings",
      keywords: ["settings", "theme", "preferences", "profile", "color"],
    },
  ];

  // ✅ Fuse.js setup for fuzzy intelligent search
  const fuse = new Fuse(fullSearchIndex, {
    keys: [
      "title",
      "keywords",
      "description",
      "category",
      "tags",
      "notes",
      "doctorName",
      "patientName",
    ],
    includeScore: true,
    threshold: 0.3,
    minMatchCharLength: 1,
    ignoreLocation: true,
  });

  // ✅ Hide results on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Search trigger
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

  // ✅ Navigate & close results
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
      <div className="flex items-center justify-between px-3 sm:px-6 py-3">
        {/* === LEFT SECTION === */}
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle */}
          <motion.button
            onClick={toggleSidebar}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: isSidebarOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
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
                  transition={{ duration: 0.3 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Logo + Title */}
          <div
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <img
              src={logoUrl}
              alt="Patient-Connect"
              className="w-8 h-8 rounded-full drop-shadow-md"
              style={{
                border: `2px solid ${accentColor}`,
                boxShadow: `0 0 8px ${accentColor}60`,
              }}
            />
            <span
              className="font-semibold text-lg hidden sm:block transition-colors"
              style={{
                color: accentColor,
                textShadow: `0 0 6px ${accentColor}40`,
              }}
            >
              Patient-Connect
            </span>
          </div>
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
              placeholder="Search anything — patients, doctors, messages, analytics..."
              className={`w-full px-3 py-2 bg-transparent outline-none rounded-full text-sm ${
                darkMode ? "text-white placeholder-gray-400" : "text-gray-900"
              }`}
            />
          </div>

          {/* ✅ Search Results Dropdown */}
          <AnimatePresence>
            {showResults && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className={`absolute mt-2 w-full rounded-lg shadow-xl overflow-hidden z-50 max-h-72 overflow-y-auto ${
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
                      (e.currentTarget.style.backgroundColor =
                        accentColor + "25")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <p className="font-medium">{res.title}</p>
                    {res.description && (
                      <p
                        className={`text-xs mt-0.5 ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {res.description}
                      </p>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* === RIGHT SECTION === */}
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-full transition"
            style={{ color: accentColor }}
            title="Notifications"
          >
            <Bell size={20} />
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full transition"
            style={{
              color: accentColor,
              backgroundColor: darkMode ? "#1f2937" : "#f3f4f6",
            }}
            title="Toggle Theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => navigate("/admin/settings?tab=profile")}
            className="p-2 rounded-full transition"
            style={{ color: accentColor }}
            title="Profile Settings"
          >
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
