// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 🌙 Dark mode state
  const [darkMode, setDarkMode] = useState(false);
  // 🎨 Accent color state
  const [accentColor, setAccentColor] = useState("#2563eb");

  // ✅ Load saved preferences
  useEffect(() => {
    const savedDark = localStorage.getItem("darkMode");
    const savedAccent = localStorage.getItem("accentColor");

    if (savedDark !== null) setDarkMode(savedDark === "true");
    if (savedAccent) setAccentColor(savedAccent);
  }, []);

  // ✅ Apply dark mode + save
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // ✅ Apply accent color globally + save
  useEffect(() => {
    document.documentElement.style.setProperty("--theme-color", accentColor);
    localStorage.setItem("accentColor", accentColor);
  }, [accentColor]);

  // ✅ Toggle function (the missing piece!)
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        toggleDarkMode,
        accentColor,
        setAccentColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook
export const useTheme = () => useContext(ThemeContext);
