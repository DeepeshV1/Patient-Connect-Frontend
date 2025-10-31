// src/pages/Patient/PatientDashboard.js
import React, { useState, useEffect } from "react";
import {
  FiThermometer,
  FiActivity,
  FiCalendar,
  FiBell,
  FiMessageCircle,
  FiBookOpen,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { usePatientData } from "../../hooks/usePatientData";
import BloodPressureSection from "../../components/patient/BloodPressureReport";
import { mockDiagnosisData } from "../../data/mockData"; // ✅ Added
import { FaHeartbeat } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { darkMode, accentColor = "#14b8a6" } = useTheme();
  const patient = usePatientData(1);

  const [connected, setConnected] = useState(true);
  const [vitals, setVitals] = useState({
    heartRate: 80,
    oxygen: 98,
    temperature: 98.6,
    systolic: 120,
    diastolic: 80,
  });
const [selectedTab, setSelectedTab] = useState("Today"); // ✅ Add this line

  // 🔄 Toggle Connected/Disconnected
  useEffect(() => {
    const timer = setInterval(() => setConnected((prev) => !prev), 15000);
    return () => clearInterval(timer);
  }, []);

  // 🩺 Simulate reading fluctuation when connected
  useEffect(() => {
    if (!connected) return;
    const interval = setInterval(() => {
      setVitals((prev) => ({
        heartRate: +(prev.heartRate + (Math.random() * 2 - 1)).toFixed(1),
        oxygen: +(prev.oxygen + (Math.random() * 0.4 - 0.2)).toFixed(1),
        temperature: +(prev.temperature + (Math.random() * 0.2 - 0.1)).toFixed(1),
        systolic: Math.round(prev.systolic + (Math.random() * 2 - 1)),
        diastolic: Math.round(prev.diastolic + (Math.random() * 2 - 1)),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [connected]);

  const appointments = patient?.appointments || [
    { id: 1, date: "Oct 30, 2025", time: "10:30 AM", doctor: "Dr. Priya Natarajan" },
    { id: 2, date: "Nov 3, 2025", time: "03:00 PM", doctor: "Dr. Karthik Iyer" },
  ];

  const notifications = patient?.notifications || [
    { id: 1, message: "Time for your evening medication 💊", time: "5 mins ago" },
    { id: 2, message: "Appointment confirmed with Dr. Priya tomorrow", time: "1 hr ago" },
  ];

  // Static demo chart data
  const bpData = [
    { day: "Mon", sys: 120, dia: 80 },
    { day: "Tue", sys: 121, dia: 82 },
    { day: "Wed", sys: 119, dia: 79 },
    { day: "Thu", sys: 122, dia: 81 },
    { day: "Fri", sys: 118, dia: 78 },
    { day: "Sat", sys: 120, dia: 80 },
    { day: "Sun", sys: 121, dia: 79 },
  ];

  return (
    <div className="p-6 space-y-8">
    {/* 🌿 Banner */}
<div
  className="text-white rounded-2xl p-6 shadow-md"
  style={{
    background: `linear-gradient(to right, ${accentColor}, #0ea5e9)`,
  }}
>
  {(() => {
    const hour = new Date().getHours();
    let greeting = "Good morning";
    if (hour >= 12 && hour < 17) greeting = "Good afternoon";
    else if (hour >= 17 || hour < 5) greeting = "Good evening";

    // ✅ Fetch name from accounts instead of patientName
    const patientName =
      mockDiagnosisData?.accounts?.[0]?.name ||
      patient?.patientName ||
      "Guest";

    return (
      <h2 className="text-2xl font-bold">
        {greeting}, {patientName}! 👋
      </h2>
    );
  })()}

  <p className="text-sm opacity-90 mt-1">
    Here’s your health overview for today. You have {appointments.length}{" "}
    upcoming appointment{appointments.length !== 1 ? "s" : ""} this week.
  </p>


        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/patient/appointments")}
            className="font-semibold px-4 py-2 rounded-xl shadow transition"
            style={{
              backgroundColor: accentColor,
              color: "#fff",
            }}
          >
            <FiCalendar className="inline mr-2" /> Schedule Appointment
          </button>
          <button
            onClick={() => navigate("/patient/lab-reports")}
            className="bg-white text-[var(--accent-color)] font-semibold px-4 py-2 rounded-xl shadow hover:bg-gray-100 transition"
            style={{
              color: accentColor,
            }}
          >
            <FiBookOpen className="inline mr-2" /> View Reports
          </button>
          <button
            onClick={() => navigate("/patient/messages")}
            className="bg-white/20 text-white font-semibold px-4 py-2 rounded-xl shadow hover:bg-white/30 transition"
          >
            <FiMessageCircle className="inline mr-2" /> Message Doctor
          </button>
        </div>
      </div>

      {/* 🩺 Mock BP Monitor */}
<section
  className={`mt-6 rounded-2xl p-5 border transition-colors ${
    darkMode
      ? "bg-slate-900 border-slate-700 text-gray-100"
      : "bg-white border-gray-200 text-gray-800"
  }`}
>
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-xl font-semibold">Health Monitor Device</h3>
    <div className="flex items-center gap-2">
      <div
        className={`h-3 w-3 rounded-full ${
          connected ? "bg-green-500 animate-pulse" : "bg-red-500"
        }`}
      ></div>
      <p
        className={`text-sm ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {connected ? "Device Connected" : "Device Disconnected"}
      </p>
    </div>
  </div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-900 text-green-400 rounded-2xl shadow-inner p-6 font-mono grid sm:grid-cols-2 lg:grid-cols-4 gap-4 border-4 border-gray-700"
        >
          <div className="flex flex-col items-center justify-center">
            <FaHeartbeat className="text-red-500 text-2xl mb-1 animate-pulse" />
            <span className="text-4xl font-bold tracking-widest">
              {vitals.heartRate}
            </span>
            <span className="text-xs">BPM</span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <FiActivity className="text-blue-400 text-2xl mb-1" />
            <span className="text-4xl font-bold tracking-widest">
              {vitals.oxygen}%
            </span>
            <span className="text-xs">SpO₂</span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <FiThermometer className="text-yellow-400 text-2xl mb-1" />
            <span className="text-4xl font-bold tracking-widest">
              {vitals.temperature.toFixed(1)}
            </span>
            <span className="text-xs">°F</span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold tracking-widest">
              {vitals.systolic}/{vitals.diastolic}
            </span>
            <span className="text-xs">mmHg</span>
          </div>
        </motion.div>
      </section>

 {/* // Replace the entire 📊 Graph + Tips section with the code below */}

<div className="mt-8">
  <BloodPressureSection />
</div>


      {/* 📅 Appointments & 🔔 Notifications */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FiCalendar style={{ color: accentColor }} /> Upcoming Appointments
          </h4>
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="p-3 mb-2 rounded-lg bg-teal-50 dark:bg-gray-700 flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  {appt.doctor}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {appt.date} • {appt.time}
                </p>
              </div>
              <button
                onClick={() => navigate("/patient/appointments")}
                className="text-sm font-medium hover:underline"
                style={{ color: accentColor }}
              >
                View
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FiBell className="text-yellow-500" /> Recent Notifications
          </h4>
          {notifications.map((note) => (
            <div
              key={note.id}
              className="p-3 mb-2 rounded-lg bg-yellow-50 dark:bg-gray-700"
            >
              <p className="text-gray-800 dark:text-gray-100">{note.message}</p>
              <p className="text-xs text-gray-500 mt-1">{note.time}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PatientDashboard;
