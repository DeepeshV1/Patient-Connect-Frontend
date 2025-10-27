import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Bell, Sun, Moon, User } from "lucide-react";
import Fuse from "fuse.js";
import { useTheme } from "../../context/ThemeContext";

// 🟢 Paste your logo URL below 👇
// const logoUrl = "https://your-image-link-here.png";
const logoUrl = "https://img.icons8.com/fluency/48/stethoscope.png";

const Navbar = ({ allPages = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const fuse = new Fuse(allPages, {
    keys: ["title", "keywords", "patientName", "doctorName"],
    threshold: 0.35, // better fuzzy match for small typos
  });

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    const searchResults = fuse.search(query);
    setResults(searchResults.map((r) => r.item));
  }, [query]);

  const handleResultClick = (path) => {
    navigate(path);
    setShowResults(false);
    setQuery("");
  };

  return (
    <nav
      className={`sticky top-0 z-40 w-full backdrop-blur-lg transition-all duration-300 ${
        darkMode ? "bg-gray-900/80 text-white" : "bg-white/80 text-gray-900"
      } shadow`}
    >
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Left Section: Logo */}
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={logoUrl} alt="logo" className="w-8 h-8" />
          <span className="font-semibold text-lg hidden sm:block">
            Patient-Connect
          </span>
        </div>

        {/* Middle Section: Search */}
        <div className="relative flex-1 mx-4 max-w-xl">
          <div
            className={`flex items-center rounded-full border transition-colors ${
              darkMode
                ? "bg-gray-800 border-gray-700 focus-within:border-blue-400"
                : "bg-gray-100 border-gray-300 focus-within:border-blue-600"
            }`}
          >
            <Search className="ml-3 text-gray-400" size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
              }}
              placeholder="Search across site, patients, or doctors..."
              className={`w-full px-3 py-2 bg-transparent outline-none rounded-full text-sm ${
                darkMode ? "text-white placeholder-gray-400" : "text-gray-900"
              }`}
            />
          </div>

          {showResults && results.length > 0 && (
            <div
              className={`absolute mt-2 w-full rounded-lg shadow-lg overflow-hidden z-50 max-h-64 overflow-y-auto ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
            >
              {results.map((res, i) => (
                <div
                  key={i}
                  onClick={() => handleResultClick(res.path)}
                  className={`px-4 py-2 cursor-pointer hover:${
                    darkMode ? "bg-blue-500/30" : "bg-blue-100"
                  }`}
                >
                  {res.title}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Section: Icons */}
        <div className="flex items-center gap-3">
          {/* Notification */}
          <button
            className={`p-2 rounded-full transition ${
              darkMode
                ? "hover:bg-blue-500/30 text-gray-300"
                : "hover:bg-blue-100 text-gray-700"
            }`}
          >
            <Bell size={20} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition ${
              darkMode
                ? "hover:bg-blue-500/30 text-yellow-300"
                : "hover:bg-blue-100 text-blue-600"
            }`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate("/admin/settings")}
            className={`p-2 rounded-full transition ${
              darkMode
                ? "hover:bg-blue-500/30 text-gray-300"
                : "hover:bg-blue-100 text-gray-700"
            }`}
          >
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
