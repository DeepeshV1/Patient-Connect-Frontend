// src/pages/Auth/AuthPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const AuthPage = () => {
  const navigate = useNavigate();
  const { darkMode, accentColor } = useTheme();
  const { login } = useAuth();

  const [isPatient, setIsPatient] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const role = isPatient ? "patient" : "admin";
      login(role); // ✅ update context
      navigate(`/${role}/dashboard`);
    }, 1000);
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isPatient ? "patient" : "admin"}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md p-8 rounded-2xl shadow-lg"
          style={{
            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            borderTop: `4px solid ${accentColor}`,
          }}
        >
          <div className="text-center mb-6">
            <span
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
              style={{
                backgroundColor: `${accentColor}20`,
                color: accentColor,
              }}
            >
              {isPatient ? "Patient Portal" : "Admin / Doctor Portal"}
            </span>
            <h1
              className="text-2xl font-bold mt-3"
              style={{ color: accentColor }}
            >
              {isPatient ? "Patient Login" : "Admin / Doctor Login"}
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <FiUser
                className="absolute left-3 top-3.5"
                style={{ color: accentColor }}
              />
              <input
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  borderColor: accentColor,
                  backgroundColor: darkMode ? "#374151" : "#f9fafb",
                  color: darkMode ? "#f9fafb" : "#1f2937",
                }}
              />
            </div>

            <div className="relative">
              <FiLock
                className="absolute left-3 top-3.5"
                style={{ color: accentColor }}
              />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-10 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  borderColor: accentColor,
                  backgroundColor: darkMode ? "#374151" : "#f9fafb",
                  color: darkMode ? "#f9fafb" : "#1f2937",
                }}
              />
              <div
                className="absolute right-3 top-3.5 cursor-pointer opacity-70 hover:opacity-100"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff style={{ color: accentColor }} />
                ) : (
                  <FiEye style={{ color: accentColor }} />
                )}
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="accent-current"
                  style={{ accentColor }}
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="hover:underline"
                style={{ color: accentColor }}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 mt-2 font-semibold rounded-lg transition-all hover:opacity-90 active:scale-[0.98]"
              style={{
                backgroundColor: accentColor,
                color: "#fff",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? "Logging in..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-5">
            <p className="text-sm opacity-80">
              {isPatient ? "Admin or Doctor?" : "Patient?"}{" "}
              <button
                onClick={() => setIsPatient(!isPatient)}
                className="font-medium underline transition-opacity hover:opacity-80"
                style={{ color: accentColor }}
              >
                Switch to {isPatient ? "Admin" : "Patient"} Portal
              </button>
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
