import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { FiTrendingUp, FiUsers, FiActivity, FiDollarSign } from "react-icons/fi";

const Analytics = () => {
  // Mock Data
  const salesData = [
    { month: "Jan", revenue: 25000, doctorSales: 10 },
    { month: "Feb", revenue: 31000, doctorSales: 15 },
    { month: "Mar", revenue: 42000, doctorSales: 22 },
    { month: "Apr", revenue: 39000, doctorSales: 20 },
    { month: "May", revenue: 48000, doctorSales: 28 },
    { month: "Jun", revenue: 54000, doctorSales: 33 },
    { month: "Jul", revenue: 61000, doctorSales: 36 },
    { month: "Aug", revenue: 70000, doctorSales: 42 },
    { month: "Sep", revenue: 67000, doctorSales: 40 },
    { month: "Oct", revenue: 75000, doctorSales: 46 },
  ];

  const patientVisits = [
    { day: "Mon", visits: 120 },
    { day: "Tue", visits: 150 },
    { day: "Wed", visits: 180 },
    { day: "Thu", visits: 140 },
    { day: "Fri", visits: 200 },
    { day: "Sat", visits: 130 },
    { day: "Sun", visits: 90 },
  ];

  const doctorAccounts = [
    { name: "Basic", value: 35 },
    { name: "Premium", value: 50 },
    { name: "Enterprise", value: 15 },
  ];

  const COLORS = ["#4ade80", "#60a5fa", "#facc15"];

  // Totals
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalDoctors = salesData.reduce((sum, item) => sum + item.doctorSales, 0);
  const totalVisits = patientVisits.reduce((sum, item) => sum + item.visits, 0);

  return (
    <div className="p-6 w-full overflow-hidden">
      <h1 className="text-2xl font-bold mb-6 text-[var(--theme-color)]">Analytics Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-green-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Total Revenue</h3>
            <FiDollarSign className="text-green-500" size={22} />
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            ₹{(totalRevenue / 1000).toFixed(1)}k
          </p>
          <p className="text-xs text-gray-400 mt-1">Overall software sales @ ₹699 each</p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Doctor Subscriptions</h3>
            <FiUsers className="text-blue-500" size={22} />
          </div>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalDoctors}</p>
          <p className="text-xs text-gray-400 mt-1">Total new accounts this year</p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-yellow-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Patient Visits</h3>
            <FiActivity className="text-yellow-500" size={22} />
          </div>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{totalVisits}</p>
          <p className="text-xs text-gray-400 mt-1">Weekly engagement snapshot</p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[var(--theme-color)]">
            <FiTrendingUp /> Monthly Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#4ade80" strokeWidth={3} />
              <Line type="monotone" dataKey="doctorSales" stroke="#60a5fa" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Patient Visits */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-[var(--theme-color)]">Patient Visits Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={patientVisits}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#facc15" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Doctor Account Types */}
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-[var(--theme-color)]">Doctor Account Breakdown</h3>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={doctorAccounts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {doctorAccounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <ul className="text-sm text-gray-600 dark:text-gray-300">
            {doctorAccounts.map((d, i) => (
              <li key={i} className="flex items-center gap-2 mb-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[i] }}
                ></span>
                {d.name}: {d.value}%
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
