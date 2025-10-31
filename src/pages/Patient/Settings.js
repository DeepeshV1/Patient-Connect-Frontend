import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  FiMoon,
  FiSun,
  FiChevronLeft,
  FiSettings,
  FiShield,
  FiCreditCard,
  FiBell,
  FiUser,
  FiSliders,
} from "react-icons/fi";

const DEFAULT = {
  profile: { name: "Aarav", email: "aarav@example.com", avatar: "" },
  theme: { preferDark: null, primaryColor: "#86d2ff" },
  payments: { methods: [{ id: 1, type: "Card", label: "Visa **** 4242" }] },
  security: { twoFA: false },
  notifications: { email: true, sms: false, push: true },
  other: {},
};

export default function SettingsPage() {
  const [params] = useSearchParams();
  const defaultTab = params.get("tab") || "profile";
  const [active, setActive] = useState(defaultTab);
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("pc_settings");
      return saved ? JSON.parse(saved) : DEFAULT;
    } catch {
      return DEFAULT;
    }
  });

  const { accentColor, setAccentColor, darkMode, toggleDarkMode } = useTheme();


useEffect(() => {
  if (settings.theme.primaryColor !== accentColor) {
    setAccentColor(settings.theme.primaryColor);
  }
}, [settings.theme.primaryColor]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--theme-color",
      settings.theme.primaryColor
    );
  }, [settings.theme.primaryColor]);

  const updateProfile = (patch) =>
    setSettings((s) => ({ ...s, profile: { ...s.profile, ...patch } }));

  const updateTheme = (patch) =>
    setSettings((s) => ({ ...s, theme: { ...s.theme, ...patch } }));

  const addPaymentMethod = (method) =>
    setSettings((s) => ({
      ...s,
      payments: { methods: [...s.payments.methods, method] },
    }));

  const removePaymentMethod = (id) =>
    setSettings((s) => ({
      ...s,
      payments: {
        methods: s.payments.methods.filter((m) => m.id !== id),
      },
    }));

  const toggle2FA = () =>
    setSettings((s) => ({
      ...s,
      security: { ...s.security, twoFA: !s.security.twoFA },
    }));

  const toggleNotif = (key) =>
    setSettings((s) => ({
      ...s,
      notifications: { ...s.notifications, [key]: !s.notifications[key] },
    }));

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-10 transition-colors duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <button
            onClick={() => setActive("profile")}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm hover:text-blue-600 mb-2 sm:mb-0"
          >
            <FiChevronLeft /> Back to Profile
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your preferences, theme, payments, and notifications
          </p>
        </div>
        <button
          onClick={() => {
            toggleDarkMode();
            updateTheme({ preferDark: !darkMode });
          }}
          className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition hover:scale-105"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <nav className="bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-200/40 dark:border-gray-700/40 shadow-md overflow-hidden">
            {[
              { key: "profile", label: "Profile", icon: <FiUser /> },
              { key: "theme", label: "Theme", icon: <FiSliders /> },
              { key: "payments", label: "Payments", icon: <FiCreditCard /> },
              { key: "security", label: "Security", icon: <FiShield /> },
              { key: "notifications", label: "Notifications", icon: <FiBell /> },
              { key: "other", label: "Other", icon: <FiSettings /> },
            ].map(({ key, label, icon }) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.03 }}
                onClick={() => setActive(key)}
                className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-medium capitalize rounded-none transition-all ${
                  active === key
                    ? "bg-[var(--theme-color)] text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {icon} {label}
              </motion.button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <section className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {active === "profile" && (
                <ProfileTab settings={settings} updateProfile={updateProfile} />
              )}
              {active === "theme" && (
                <ThemeTab
                  settings={settings}
                  updateTheme={updateTheme}
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              )}
              {active === "payments" && (
                <PaymentsTab
                  settings={settings}
                  addPaymentMethod={addPaymentMethod}
                  removePaymentMethod={removePaymentMethod}
                />
              )}
              {active === "security" && (
                <SecurityTab settings={settings} toggle2FA={toggle2FA} />
              )}
              {active === "notifications" && (
                <NotificationsTab
                  settings={settings}
                  toggleNotif={toggleNotif}
                />
              )}
              {active === "other" && (
                <OtherTab settings={settings} setSettings={setSettings} />
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}

/* ----------- COMPONENTS ----------- */

const Card = ({ children }) => (
  <motion.div
    whileHover={{ scale: 1.005 }}
    className="bg-white dark:bg-gray-800/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-gray-200/40 dark:border-gray-700/40 shadow-md transition-all"
  >
    {children}
  </motion.div>
);

/* Profile */
function ProfileTab({ settings, updateProfile }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Profile Settings
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Full Name
          </label>
          <input
            value={settings.profile.name}
            onChange={(e) => updateProfile({ name: e.target.value })}
            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border focus:ring-2 focus:ring-[var(--theme-color)]"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Email
          </label>
          <input
            value={settings.profile.email}
            onChange={(e) => updateProfile({ email: e.target.value })}
            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border focus:ring-2 focus:ring-[var(--theme-color)]"
          />
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3 justify-end">
        <button className="px-5 py-2 rounded-lg bg-[var(--theme-color)] text-white hover:opacity-90">
          Save Changes
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("pc_settings");
            window.location.reload();
          }}
          className="px-5 py-2 rounded-lg border text-gray-700 dark:text-gray-300"
        >
          Reset Defaults
        </button>
      </div>
    </Card>
  );
}

/* Theme */
function ThemeTab({ settings, updateTheme, darkMode, toggleDarkMode }) {
  const quickColors = [
    "#86d2ff", // Light blue (default)
    "#22c55e", // Green
    "#f43f5e", // Red
    "#a855f7", // Purple
    "#f59e0b", // Amber
    "#3b82f6", // Blue
  ];

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Appearance
      </h2>
      <div className="grid sm:grid-cols-2 gap-8">
        {/* Accent color selector */}
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Primary Accent Color
          </p>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {quickColors.map((color) => (
              <button
                key={color}
                onClick={() => updateTheme({ primaryColor: color })}
                className={`w-8 h-8 rounded-full border-2 transition ${
                  settings.theme.primaryColor === color
                    ? "ring-2 ring-offset-2 ring-[var(--theme-color)]"
                    : ""
                }`}
                style={{
                  backgroundColor: color,
                  borderColor:
                    settings.theme.primaryColor === color
                      ? "var(--theme-color)"
                      : "#ccc",
                }}
              />
            ))}

            {/* Custom color picker */}
            <label
              className="cursor-pointer w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
              title="Custom color"
            >
              +
              <input
                type="color"
                value={settings.theme.primaryColor}
                onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                className="absolute opacity-0 w-8 h-8 cursor-pointer"
              />
            </label>
          </div>

          {/* Manual color input */}
          <input
            type="color"
            value={settings.theme.primaryColor}
            onChange={(e) => updateTheme({ primaryColor: e.target.value })}
            className="w-24 h-12 rounded-lg cursor-pointer border"
          />
        </div>

        {/* Light / Dark toggle */}
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Theme Mode
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                updateTheme({ preferDark: false });
                if (darkMode) toggleDarkMode();
              }}
              className={`px-4 py-2 rounded-lg w-full sm:w-auto ${
                !darkMode
                  ? "bg-[var(--theme-color)] text-white"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => {
                updateTheme({ preferDark: true });
                if (!darkMode) toggleDarkMode();
              }}
              className={`px-4 py-2 rounded-lg w-full sm:w-auto ${
                darkMode
                  ? "bg-[var(--theme-color)] text-white"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              Dark
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}


/* Payments */
function PaymentsTab({ settings, addPaymentMethod, removePaymentMethod }) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("Card");

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Payment Methods
      </h2>
      <div className="space-y-4">
        {settings.payments.methods.map((m) => (
          <div
            key={m.id}
            className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900/40 rounded-lg border"
          >
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-200">
                {m.label}
              </p>
              <p className="text-xs text-gray-500">{m.type}</p>
            </div>
            <button
              onClick={() => removePaymentMethod(m.id)}
              className="px-3 py-1 text-sm text-red-600 border rounded-md hover:bg-red-50 dark:hover:bg-red-900/10"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex flex-wrap gap-3 pt-4 items-center">
          <input
            placeholder="Card label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="flex-1 min-w-[150px] p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border focus:ring-2 focus:ring-[var(--theme-color)]"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border"
          >
            <option>Card</option>
            <option>UPI</option>
            <option>Bank</option>
          </select>
          <button
            onClick={() => {
              if (label.trim()) {
                addPaymentMethod({ id: Date.now(), type, label });
                setLabel("");
              }
            }}
            className="px-5 py-2 rounded-lg bg-[var(--theme-color)] text-white"
          >
            Add
          </button>
        </div>
      </div>
    </Card>
  );
}

/* Security */
function SecurityTab({ settings, toggle2FA }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Security
      </h2>
      <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900/40 rounded-lg border">
        <div>
          <p className="font-medium text-gray-700 dark:text-gray-200">
            Two-Factor Authentication
          </p>
          <p className="text-xs text-gray-500">
            Add an extra layer of security to your account
          </p>
        </div>
        <input
          type="checkbox"
          checked={settings.security.twoFA}
          onChange={toggle2FA}
          className="scale-125 accent-[var(--theme-color)]"
        />
      </div>
    </Card>
  );
}

/* Notifications */
function NotificationsTab({ settings, toggleNotif }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Notifications
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(settings.notifications).map((key) => (
          <div
            key={key}
            className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900/40 border rounded-lg"
          >
            <span className="capitalize text-gray-700 dark:text-gray-300">
              {key} alerts
            </span>
            <input
              type="checkbox"
              checked={settings.notifications[key]}
              onChange={() => toggleNotif(key)}
              className="scale-110 accent-[var(--theme-color)]"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

/* Other */
function OtherTab({ settings, setSettings }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const resetAll = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Other Settings
      </h2>
      <div className="flex flex-wrap gap-3 justify-end">
        <button
          onClick={() => {
            const blob = new Blob([JSON.stringify(settings, null, 2)], {
              type: "application/json",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "patientconnect-settings.json";
            a.click();
          }}
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:scale-105 transition"
        >
          Export Settings
        </button>

        <button
          onClick={() => setShowConfirm(true)}
          className="px-4 py-2 rounded-lg border text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition"
        >
          Reset All
        </button>
      </div>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-80"
            >
              <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                Confirm Reset
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                This will delete all saved settings. Continue?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={resetAll}
                  className="px-3 py-2 rounded-md bg-red-600 text-white text-sm"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
