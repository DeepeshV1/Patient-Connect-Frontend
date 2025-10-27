// src/pages/Admin/Dashboard.jsx
import React from "react";
import { FaUser, FaStethoscope, FaCalendarCheck, FaDollarSign } from "react-icons/fa";
import AppointmentChart from "../../components/admin/Charts/AppointmentChart";
import { FaRupeeSign } from "react-icons/fa";

const Dashboard = () => {
  const stats = [
    { title: "Total Patients", value: 1200, icon: <FaUser />, trend: "+5%" },
    { title: "Total Doctors", value: 75, icon: <FaStethoscope />, trend: "+2%" },
    { title: "Appointments Today", value: 32, icon: <FaCalendarCheck />, trend: "+10%" },
      { 
      title: "Revenue", 
      value: new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(12300),
      icon: <FaRupeeSign />, 
      trend: "+8%" 
    },
  ];

  const recentAppointments = [
    { patient: "John Doe", doctor: "Dr. Smith", date: "24 Oct 2025", status: "Completed" },
    { patient: "Jane Roe", doctor: "Dr. Adams", date: "24 Oct 2025", status: "Pending" },
    { patient: "Mark Lee", doctor: "Dr. Brown", date: "23 Oct 2025", status: "Completed" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage patients, doctors, and clinic performance.</p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all p-5 flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
              <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-indigo-600 dark:text-indigo-400 text-2xl">{stat.icon}</div>
              <span className="text-sm text-green-600 dark:text-green-400 mt-1">{stat.trend}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Chart */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
        <h3 className="text-lg font-semibold mb-4">Appointments & Revenue Trend</h3>
        <AppointmentChart />
      </section>

      {/* Recent Appointments */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Recent Appointments</h3>
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              {["Patient", "Doctor", "Date", "Status", "Actions"].map((head) => (
                <th key={head} className="px-4 py-2 border-b text-sm font-medium">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentAppointments.map((a, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900 border-b">
                <td className="px-4 py-2">{a.patient}</td>
                <td className="px-4 py-2">{a.doctor}</td>
                <td className="px-4 py-2">{a.date}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    a.status === "Completed"
                      ? "text-green-600"
                      : a.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {a.status}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                    View
                  </button>
                  <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
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
