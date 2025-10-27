import React from "react";
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
import { useTheme } from "../../context/ThemeContext";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { darkMode } = useTheme();

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: FiHome },
    { to: "/patients", label: "Patients", icon: FiUsers },
    { to: "/doctors", label: "Doctors", icon: MdOutlineMedicalServices },
    { to: "/messages", label: "Messages", icon: FiMessageSquare },
    { to: "/appointments", label: "Appointments", icon: FiCalendar },
    { to: "/reminders", label: "Reminders", icon: FiBell },
    { to: "/reports", label: "Reports", icon: FiBarChart2 },
    { to: "/pharmacy", label: "Pharmacy", icon: MdLocalPharmacy },
    { to: "/settings", label: "Settings", icon: FiSettings },
  ];

  const handleLinkClick = () => {
    // close sidebar if currently open (useful for mobile or collapsed mode)
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen pt-16 border-r shadow-sm z-40 transition-all duration-500 ease-in-out
      ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}
      ${isOpen ? "w-64" : "w-20"}`}
    >
      <div className="flex flex-col justify-between h-full overflow-hidden">
        <nav className="mt-4 px-2 space-y-1 overflow-y-auto">
          {links.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={handleLinkClick}
                className={`group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
                  ${
                    active
                      ? "bg-[var(--theme-color)] text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
              >
                <Icon
                  size={18}
                  className={`transition-colors duration-300 ${
                    active
                      ? "text-white"
                      : "group-hover:text-[var(--theme-color)]"
                  }`}
                />
                {isOpen && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 dark:border-gray-800 px-3 py-3">
          <button
            onClick={() => alert("Logging out...")}
            className="group flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 w-full"
          >
            <FiLogOut
              className="transition-colors group-hover:text-red-600"
              size={18}
            />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
