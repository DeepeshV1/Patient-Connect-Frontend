import React, { useState, useEffect, useRef } from "react";
import PatientSidebar from "../components/patient/Sidebar";
import PatientNavbar from "../components/patient/Navbar";

const PatientLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // unified state
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);

  // ✅ Theme logic
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    root.classList.toggle("dark", isDark);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // ✅ Toggle sidebar (works for both navbar and mobile)
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // ✅ Navbar hide-on-scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-950 overflow-hidden">
      {/* ✅ Sidebar (controlled by Navbar toggle) */}
      <PatientSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isDesktopExpanded={isDesktopExpanded}
        setIsDesktopExpanded={setIsDesktopExpanded}
      />

      {/* ✅ Main Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 `}
      >
        {/* ✅ Navbar (fixed + hide on scroll) */}
        <div
          className={`fixed top-0 left-0 w-full z-50 transform transition-transform duration-500 ${
            isNavbarVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <PatientNavbar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>

        {/* ✅ Scrollable main content */}
        <main
          className="flex-1 overflow-y-auto pt-[72px]"
          onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
        >
          <div className="p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
