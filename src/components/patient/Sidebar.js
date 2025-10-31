import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiClipboard,
  FiCalendar,
  FiBell,
  FiBookOpen,
  FiFileText,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiChevronLeft,
  FiEdit3,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const PatientSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isDesktopExpanded,
  setIsDesktopExpanded,
}) => {
  const { accentColor, darkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(
    localStorage.getItem("hideLogoutConfirm") === "true"
  );

  const links = [
    { name: "Dashboard", icon: FiHome, path: "/patient/dashboard" },
    { name: "Prescription", icon: FiClipboard, path: "/patient/prescription" },
    { name: "Lab Reports", icon: FiFileText, path: "/patient/lab-reports" },
    { name: "Appointments", icon: FiCalendar, path: "/patient/appointments" },
    { name: "Notifications", icon: FiBell, path: "/patient/notifications" },
    { name: "Education", icon: FiBookOpen, path: "/patient/education" },
    { name: "Blogs", icon: FiEdit3, path: "/patient/blogs" }, 
    { name: "Account", icon: FiUser, path: "/patient/account" },
    { name: "Settings", icon: FiSettings, path: "/patient/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("patientSession");
    navigate("/auth");
  };

  const handleSignOutClick = () => {
    if (dontShowAgain) handleLogout();
    else setShowLogoutPopup(true);
  };

  const confirmLogout = () => {
    if (dontShowAgain) localStorage.setItem("hideLogoutConfirm", "true");
    setShowLogoutPopup(false);
    handleLogout();
  };

  return (
    <>
      {/* Overlay for mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isSidebarOpen ? 1 : 0,
          pointerEvents: isSidebarOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/40 z-30 md:hidden"
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            key="sidebar"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 900,
              damping: 20,
              mass: 0.6,
            }}
            className={`fixed md:static z-40 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
              ${isDesktopExpanded ? "w-64" : "w-20"}
              transition-all duration-200 shadow-lg md:shadow-none`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700">
              <h1
                className={`font-semibold text-lg text-gray-700 dark:text-gray-200 ${
                  !isDesktopExpanded && "hidden md:block"
                }`}
              >
                Patient Hub
              </h1>

              {/* Desktop toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 600, damping: 18 }}
                onClick={() => setIsDesktopExpanded((v) => !v)}
                className="hidden md:block text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {isDesktopExpanded ? <FiChevronLeft /> : <FiMenu />}
              </motion.button>

              {/* Mobile close */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 600, damping: 18 }}
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </motion.button>
            </div>

            {/* Links */}
            <nav className="p-2 space-y-1">
              {links.map(({ name, icon: Icon, path }) => {
                const active = location.pathname === path;
                return (
                  <motion.div
                    key={name}
                    initial={{ x: -15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                      delay: 0.03,
                    }}
                    whileHover={{
                      scale: 1.04,
                      transition: { type: "spring", stiffness: 500 },
                    }}
                  >
                    <Link
                      to={path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                        active
                          ? "text-white shadow-md"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      style={
                        active
                          ? {
                              backgroundColor: accentColor,
                              boxShadow: `0 0 10px ${accentColor}80`,
                            }
                          : {}
                      }
                    >
                      <Icon
                        size={20}
                        className={`transition ${
                          active ? "text-white" : "text-gray-500"
                        }`}
                      />
                      {isDesktopExpanded && <span>{name}</span>}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Sign Out Button */}
              <motion.div
                initial={{ x: -15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                  delay: 0.05,
                }}
                whileHover={{
                  scale: 1.04,
                  transition: { type: "spring", stiffness: 500 },
                }}
              >
                <button
                  onClick={handleSignOutClick}
                  className="flex items-center w-full space-x-3 px-4 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <FiLogOut size={20} />
                  {isDesktopExpanded && <span>Sign Out</span>}
                </button>
              </motion.div>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Logout popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={`p-6 rounded-xl shadow-xl w-80 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-lg font-semibold mb-3">
              Are you sure you want to sign out?
            </h2>
            <label className="flex items-center space-x-2 text-sm mb-4">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
              />
              <span>Don’t show this again</span>
            </label>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:opacity-80"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-lg text-white"
                style={{ backgroundColor: accentColor }}
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default PatientSidebar;
