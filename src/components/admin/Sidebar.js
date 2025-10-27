import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiMessageSquare,
  FiCalendar,
  FiBell,
  FiBarChart2,
  FiLogOut,
} from "react-icons/fi";
import { MdLocalPharmacy, MdOutlineMedicalServices } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const Sidebar = ({ isOpen, toggleSidebar, setIsOpen }) => {
  const location = useLocation();
  const { darkMode, accentColor } = useTheme();
  const sidebarRef = useRef(null);

  const bgColor = darkMode ? "bg-gray-900" : "bg-white";
  const textColor = darkMode ? "text-gray-300" : "text-gray-700";
  const borderColor = darkMode ? "border-gray-800" : "border-gray-200";

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <FiHome size={18} /> },
    { to: "/patients", label: "Patients", icon: <FiUsers size={18} /> },
    { to: "/doctors", label: "Doctors", icon: <MdOutlineMedicalServices size={18} /> },
    { to: "/messages", label: "Messages", icon: <FiMessageSquare size={18} /> },
    { to: "/appointments", label: "Appointments", icon: <FiCalendar size={18} /> },
    { to: "/reminders", label: "Reminders", icon: <FiBell size={18} /> },
    { to: "/reports", label: "Reports", icon: <FiBarChart2 size={18} /> },
    { to: "/analytics", label: "Analytics", icon: <MdLocalPharmacy size={18} /> },
    { to: "/settings", label: "Settings", icon: <FiSettings size={18} /> },
  ];

  // Default closed
  useEffect(() => {
    if (setIsOpen) setIsOpen(false);
  }, [setIsOpen]);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        if (isOpen) setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, setIsOpen]);

  return (
    <motion.aside
      ref={sidebarRef}
      initial={{ width: isOpen ? 256 : 80 }}
      animate={{ width: isOpen ? 256 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 h-screen pt-16 ${bgColor} ${borderColor} border-r shadow-md z-40 overflow-hidden`}
    >
      <div className="flex flex-col justify-between h-full">
        <nav className="mt-4 px-2 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  active ? "text-white" : `${textColor}`
                }`}
                style={{
                  backgroundColor: active ? accentColor : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = accentColor;
                    e.currentTarget.style.color = "#fff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "";
                  }
                }}
              >
                <span
                  className={`transition-transform duration-300 group-hover:scale-110 ${
                    active ? "text-white" : "group-hover:text-white"
                  }`}
                  style={{
                    color: active ? "#fff" : accentColor,
                  }}
                >
                  {link.icon}
                </span>
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="whitespace-nowrap"
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className={`border-t ${borderColor} px-3 py-3`}>
          <button
            onClick={() => alert("Logging out...")}
            className={`group flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-300 w-full ${
              darkMode
                ? "text-gray-300 hover:bg-red-600 hover:text-white"
                : "text-gray-700 hover:bg-red-50 hover:text-red-600"
            }`}
          >
            <FiLogOut
              size={18}
              className="transition-colors duration-300 group-hover:text-white"
              style={{ color: accentColor }}
            />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
