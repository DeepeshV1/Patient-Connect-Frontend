import React, { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import AdminNavbar from "../components/admin/Navbar";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        <AdminNavbar
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="relative left-[5vw] flex-1 w-[95vw] overflow-x-hidden p-4">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
