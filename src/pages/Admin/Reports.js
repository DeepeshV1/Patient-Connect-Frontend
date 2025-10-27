// src/pages/Admin/Reports.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { FaFileMedical, FaPlus, FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";

const Reports = () => {
  const { darkMode } = useTheme();

  // ✅ Mock South Indian Patient Reports
  const [reports, setReports] = useState([
    { id: 1, patient: "Arun Kumar", test: "Blood Test", result: "Normal", date: "2025-10-25", hemoglobin: 13.7, sugar: 90, cholesterol: 170 },
    { id: 2, patient: "Priya Ramesh", test: "Thyroid Panel", result: "Slightly Elevated TSH", date: "2025-10-24", hemoglobin: 13.1, sugar: 98, cholesterol: 190 },
    { id: 3, patient: "Karthik V", test: "Lipid Profile", result: "Elevated Cholesterol", date: "2025-10-23", hemoglobin: 14.2, sugar: 102, cholesterol: 220 },
    { id: 4, patient: "Meena S", test: "Diabetes Screening", result: "Normal", date: "2025-10-21", hemoglobin: 13.9, sugar: 92, cholesterol: 175 },
    { id: 5, patient: "Ravi Shankar", test: "Heart Health Check", result: "Good", date: "2025-10-20", hemoglobin: 14.0, sugar: 89, cholesterol: 160 },
  ]);

  const [newReport, setNewReport] = useState({
    patient: "",
    test: "",
    result: "",
    date: "",
    hemoglobin: "",
    sugar: "",
    cholesterol: "",
  });
  const [editingId, setEditingId] = useState(null);

  // CRUD
  const handleAdd = () => {
    if (!newReport.patient || !newReport.test) return;
    const id = Date.now();
    setReports([...reports, { id, ...newReport }]);
    setNewReport({
      patient: "", test: "", result: "", date: "", hemoglobin: "", sugar: "", cholesterol: "",
    });
  };

  const handleEdit = (id) => {
    const r = reports.find((r) => r.id === id);
    setNewReport(r);
    setEditingId(id);
  };

  const handleUpdate = () => {
    setReports(reports.map((r) => (r.id === editingId ? { ...r, ...newReport } : r)));
    setEditingId(null);
    setNewReport({
      patient: "", test: "", result: "", date: "", hemoglobin: "", sugar: "", cholesterol: "",
    });
  };

  const handleDelete = (id) => setReports(reports.filter((r) => r.id !== id));

  const handleDownload = (r) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Patient Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Patient: ${r.patient}`, 20, 40);
    doc.text(`Test: ${r.test}`, 20, 50);
    doc.text(`Result: ${r.result}`, 20, 60);
    doc.text(`Date: ${r.date}`, 20, 70);
    doc.text(`Hemoglobin: ${r.hemoglobin}`, 20, 85);
    doc.text(`Sugar: ${r.sugar}`, 20, 95);
    doc.text(`Cholesterol: ${r.cholesterol}`, 20, 105);
    doc.save(`${r.patient}_Report.pdf`);
  };

  return (
    <div className={`min-h-screen p-6 transition-all duration-500 ${darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaFileMedical className="text-indigo-500" /> Reports
      </h1>

      {/* Add/Edit Form */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`p-6 mb-6 rounded-2xl border shadow-sm ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
      >
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Report" : "Add New Report"}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {["patient", "test", "result", "date", "hemoglobin", "sugar", "cholesterol"].map((f) => (
            <input
              key={f}
              type={f === "date" ? "date" : "text"}
              placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
              value={newReport[f]}
              onChange={(e) => setNewReport({ ...newReport, [f]: e.target.value })}
              className={`rounded-lg px-4 py-2 text-sm border ${darkMode ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-3">
          {editingId ? (
            <button onClick={handleUpdate} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">Update</button>
          ) : (
            <button onClick={handleAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <FaPlus /> Add Report
            </button>
          )}
        </div>
      </motion.div>

      {/* Reports Table */}
      <div className={`p-6 rounded-2xl border shadow-sm overflow-x-auto ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        <h2 className="text-lg font-semibold mb-4">Patient Reports</h2>
        <table className="min-w-full text-sm border-collapse">
          <thead className={darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-800"}>
            <tr>
              {["Patient", "Test", "Result", "Date", "Actions"].map((h) => (
                <th key={h} className="px-4 py-2 text-left border-b">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className={`border-b ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                <td className="px-4 py-2">{r.patient}</td>
                <td className="px-4 py-2">{r.test}</td>
                <td className="px-4 py-2">{r.result}</td>
                <td className="px-4 py-2">{r.date}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => handleEdit(r.id)} className="text-yellow-500 hover:text-yellow-600"><FaEdit /></button>
                  <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:text-red-600"><FaTrash /></button>
                  <button onClick={() => handleDownload(r)} className="text-blue-600 hover:text-blue-700"><FaDownload /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart Visualization */}
      <div className={`mt-6 p-6 rounded-2xl border shadow-sm ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        <h2 className="text-lg font-semibold mb-4">Lab Values Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reports}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="patient" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="hemoglobin" fill="#6366F1" />
            <Bar dataKey="sugar" fill="#22C55E" />
            <Bar dataKey="cholesterol" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
