// src/pages/Admin/Dashboard.jsx
import React from "react";
import {
  FaUser,
  FaStethoscope,
  FaCalendarCheck,
  FaDollarSign,
} from "react-icons/fa";
import AppointmentChart from "../../components/admin/Charts/AppointmentChart";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { darkMode } = useTheme();

  const stats = [
    { title: "Total Patients", value: 1200, icon: <FaUser />, trend: "+5%" },
    { title: "Total Doctors", value: 75, icon: <FaStethoscope />, trend: "+2%" },
    { title: "Appointments Today", value: 32, icon: <FaCalendarCheck />, trend: "+10%" },
    { title: "Revenue", value: "$12,300", icon: <FaDollarSign />, trend: "+8%" },
  ];

  const recentAppointments = [
    { patient: "John Doe", doctor: "Dr. Smith", date: "24 Oct 2025", status: "Completed" },
    { patient: "Jane Roe", doctor: "Dr. Adams", date: "24 Oct 2025", status: "Pending" },
    { patient: "Mark Lee", doctor: "Dr. Brown", date: "23 Oct 2025", status: "Completed" },
  ];

  return (
    <div
      className={`space-y-8 transition-colors duration-500 ${
        darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header className="text-center sm:text-left">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p
          className={`mt-1 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          } transition-colors`}
        >
          Manage patients, doctors, and clinic performance.
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-2xl shadow-sm border p-5 flex justify-between items-center transition-all duration-500
              ${
                darkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-750 hover:shadow-lg"
                  : "bg-white border-gray-200 hover:bg-gray-100 hover:shadow-md"
              }`}
          >
            <div>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {stat.title}
              </p>
              <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
            </div>
            <div className="flex flex-col items-end">
              <div
                className={`text-2xl ${
                  darkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                {stat.icon}
              </div>
              <span
                className={`text-sm mt-1 ${
                  darkMode ? "text-green-400" : "text-green-600"
                }`}
              >
                {stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Chart */}
      <section
        className={`rounded-2xl shadow-sm border p-5 transition-all duration-500
          ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
      >
        <h3 className="text-lg font-semibold mb-4">
          Appointments & Revenue Trend
        </h3>
        <AppointmentChart />
      </section>

      {/* Recent Appointments */}
      <section
        className={`rounded-2xl shadow-sm border p-5 overflow-x-auto transition-all duration-500
          ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
      >
        <h3 className="text-lg font-semibold mb-4">Recent Appointments</h3>
        <table className="min-w-full text-left border-collapse">
          <thead
            className={`text-gray-700 dark:text-gray-200 transition-colors ${
              darkMode ? "bg-gray-700/60" : "bg-gray-100"
            }`}
          >
            <tr>
              {["Patient", "Doctor", "Date", "Status", "Actions"].map((head) => (
                <th
                  key={head}
                  className="px-4 py-2 border-b text-sm font-medium"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentAppointments.map((a, i) => (
              <tr
                key={i}
                className={`border-b transition-colors ${
                  darkMode
                    ? "hover:bg-gray-900/50 border-gray-700"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
              >
                <td className="px-4 py-2">{a.patient}</td>
                <td className="px-4 py-2">{a.doctor}</td>
                <td className="px-4 py-2">{a.date}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    a.status === "Completed"
                      ? darkMode
                        ? "text-green-400"
                        : "text-green-600"
                      : a.status === "Pending"
                      ? darkMode
                        ? "text-yellow-400"
                        : "text-yellow-600"
                      : darkMode
                      ? "text-red-400"
                      : "text-red-600"
                  }`}
                >
                  {a.status}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className={`px-3 py-1 rounded text-sm transition-all ${
                      darkMode
                        ? "bg-blue-600 hover:bg-blue-500 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    View
                  </button>
                  <button
                    className={`px-3 py-1 rounded text-sm transition-all ${
                      darkMode
                        ? "bg-yellow-500 hover:bg-yellow-400 text-gray-900"
                        : "bg-yellow-500 hover:bg-yellow-600 text-white"
                    }`}
                  >
                    Edit
                  </button>
                  <button
                    className={`px-3 py-1 rounded text-sm transition-all ${
                      darkMode
                        ? "bg-red-600 hover:bg-red-500 text-white"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
