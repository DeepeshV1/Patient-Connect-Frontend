import React, { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import AdminNavbar from "../components/admin/Navbar";
import { useTheme } from "../context/ThemeContext";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { darkMode } = useTheme();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div
      className={`flex min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setIsOpen={setIsSidebarOpen}   // ✅ FIXED
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <AdminNavbar toggleSidebar={toggleSidebar} />

        {/* Main Page Content */}
        <main
          className={`flex-1 relative left-[5vw] top-[5vh] max-w-[95vw] overflow-y-auto transition-all duration-500 ${
            isSidebarOpen ? "md:ml-0" : "ml-0"
          } ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}
        >
          <div className="p-4 sm:p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
