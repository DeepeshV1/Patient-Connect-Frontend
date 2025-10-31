// src/components/admin/Sidebar.js
import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // ✅ added useNavigate
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

const Sidebar = ({ isOpen = false, setIsOpen = () => {}, toggleSidebar = () => {} }) => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ create navigate instance
  const { darkMode, accentColor } = useTheme();
  const sidebarRef = useRef(null);

  const collapsedW = 72;
  const expandedW = 260;
  const navbarHeight = 64;

  const bgColor = darkMode ? "bg-gray-900" : "bg-white";
  const textColor = darkMode ? "text-gray-300" : "text-gray-700";
  const borderColor = darkMode ? "border-gray-800" : "border-gray-200";

  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <FiHome size={18} /> },
    { to: "/admin/patients", label: "Patients", icon: <FiUsers size={18} /> },
    { to: "/admin/doctors", label: "Doctors", icon: <MdOutlineMedicalServices size={18} /> },
    { to: "/admin/messages", label: "Messages", icon: <FiMessageSquare size={18} /> },
    { to: "/admin/appointments", label: "Appointments", icon: <FiCalendar size={18} /> },
    { to: "/admin/reminders", label: "Reminders", icon: <FiBell size={18} /> },
    { to: "/admin/reports", label: "Reports", icon: <FiBarChart2 size={18} /> },
    { to: "/admin/analytics", label: "Analytics", icon: <MdLocalPharmacy size={18} /> },
    { to: "/admin/settings", label: "Settings", icon: <FiSettings size={18} /> },
  ];

  // Close on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (!sidebarRef.current) return;
      if (isOpen && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isOpen, setIsOpen]);

  return (
    <motion.aside
      ref={sidebarRef}
      initial={false}
      animate={{ width: isOpen ? expandedW : collapsedW }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        top: navbarHeight,
        height: `calc(100vh - ${navbarHeight}px)`,
      }}
      className={`fixed left-0 z-50 ${bgColor} ${borderColor} border-r shadow-lg overflow-hidden`}
      aria-hidden={!isOpen}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 overflow-y-auto px-1 py-3">
          {links.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  active ? "text-white" : `${textColor}`
                }`}
                style={{
                  backgroundColor: active ? accentColor : "transparent",
                  margin: "4px 4px",
                }}
              >
                <span
                  className="flex items-center justify-center"
                  style={{
                    width: 28,
                    color: active ? "#fff" : accentColor,
                  }}
                >
                  {link.icon}
                </span>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.15 }}
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

        {/* ✅ Logout now redirects to /auth */}
        <div className={`px-2 py-3 border-t ${borderColor}`}>
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/auth"); // ✅ redirect to Auth/Login page
            }}
            className="group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium w-full transition-colors duration-200"
            style={{
              color: darkMode ? "rgb(220 220 220)" : "rgb(55 65 81)",
            }}
          >
            <FiLogOut size={18} style={{ color: accentColor }} />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
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
