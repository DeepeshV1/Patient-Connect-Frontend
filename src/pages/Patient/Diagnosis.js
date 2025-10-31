import React, { useState } from "react";
import { CalendarDays, FileText, Pill, FlaskConical, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import diagnosisData from "../../data/diagnosisMockData";

export default function Diagnosis() {
  const { darkMode, accentColor } = useTheme();
  const [activeType, setActiveType] = useState("appointments");
  const [expanded, setExpanded] = useState(null);

  const data = diagnosisData[activeType];

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div
      className={`p-6 space-y-6 transition-all duration-200 ${
        darkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1
          className="text-3xl font-bold flex items-center gap-2"
          style={{ color: accentColor }}
        >
          <CalendarDays className="w-7 h-7" /> Diagnosis Summary
        </h1>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveType("appointments")}
            className={`px-4 py-2 rounded-full border transition-all duration-200 ${
              activeType === "appointments"
                ? `bg-[${accentColor}] text-white`
                : "border-gray-300 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-800"
            }`}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveType("prescriptions")}
            className={`px-4 py-2 rounded-full border transition-all duration-200 ${
              activeType === "prescriptions"
                ? `bg-[${accentColor}] text-white`
                : "border-gray-300 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-800"
            }`}
          >
            Prescriptions
          </button>
          <button
            onClick={() => setActiveType("labReports")}
            className={`px-4 py-2 rounded-full border transition-all duration-200 ${
              activeType === "labReports"
                ? `bg-[${accentColor}] text-white`
                : "border-gray-300 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-800"
            }`}
          >
            Lab Reports
          </button>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {data.map((item) => (
          <motion.div
            key={item.id}
            layout
            className={`p-5 rounded-2xl shadow-sm border transition-all duration-200 cursor-pointer ${
              darkMode
                ? "bg-slate-800 border-slate-700 hover:border-[var(--accent)]"
                : "bg-white border-gray-200 hover:border-[var(--accent)]"
            }`}
            onClick={() => handleExpand(item.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  {activeType === "appointments" && <CalendarDays className="w-5 h-5 text-blue-500" />}
                  {activeType === "prescriptions" && <Pill className="w-5 h-5 text-green-500" />}
                  {activeType === "labReports" && <FlaskConical className="w-5 h-5 text-purple-500" />}
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.subtitle}</p>
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expanded === item.id ? "rotate-180" : ""
                }`}
              />
            </div>

            {expanded === item.id && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="mt-4 text-sm border-t pt-3 dark:border-slate-700"
              >
                <p>{item.details}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Downloading ${item.title} report...`);
                  }}
                  className="mt-3 inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md border dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
                >
                  <FileText className="w-4 h-4" /> Download PDF
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
