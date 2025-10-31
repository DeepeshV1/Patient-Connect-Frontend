// src/pages/Patient/Notifications.js
import React, { useState, useEffect } from "react";
import {
  Bell,
  CheckCircle2,
  Clock,
  FileText,
  CalendarDays,
  FlaskConical,
  X,
  Download,
  LayoutGrid,
  Rows,
  KanbanSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { downloadTextAsPdf } from "../../utils/filehelpers";
import { mockDiagnosisData } from "../../data/mockData"; // use shared mock data
export default function Notifications() {
  const [items, setItems] = useState(mockDiagnosisData.notifications || []);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // ✅ grid | list | kanban
  const { accentColor } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const markRead = (id) =>
    setItems((s) => s.map((it) => (it.id === id ? { ...it, read: true } : it)));

  const clearAll = () => {
    setItems([]);
    setSelected(null);
  };

  const filtered =
    filter === "All"
      ? items
      : filter === "Unread"
      ? items.filter((i) => !i.read)
      : items.filter((i) => i.type === filter.toLowerCase());

  const getIcon = (type) => {
    switch (type) {
      case "appointment":
        return <CalendarDays size={18} />;
      case "lab":
        return <FlaskConical size={18} />;
      case "system":
        return <FileText size={18} />;
      default:
        return <Bell size={18} />;
    }
  };

  const handleDownload = (n) => {
    if (n.type === "lab" || n.type === "appointment") {
      const lines = [
        `Notification ID: ${n.id}`,
        `Title: ${n.title}`,
        `Details: ${n.details}`,
        `Time: ${n.time}`,
      ];
      downloadTextAsPdf(`${n.id}.pdf`, n.title, lines);
    } else {
      alert("This notification has no downloadable report.");
    }
  };

  return (
    <div className="relative p-6 space-y-6 overflow-hidden">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Bell style={{ color: accentColor }} />
          <h1 className="text-2xl font-semibold dark:text-gray-100">
            Notifications
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {/* ✅ View mode toggles */}
          <div className="flex items-center gap-1 border rounded-lg dark:border-slate-700">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${
                viewMode === "grid"
                  ? "bg-gray-100 dark:bg-slate-800"
                  : "hover:bg-gray-50 dark:hover:bg-slate-800"
              }`}
            >
              <LayoutGrid size={16} style={{ color: accentColor }} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${
                viewMode === "list"
                  ? "bg-gray-100 dark:bg-slate-800"
                  : "hover:bg-gray-50 dark:hover:bg-slate-800"
              }`}
            >
              <Rows size={16} style={{ color: accentColor }} />
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-2 ${
                viewMode === "kanban"
                  ? "bg-gray-100 dark:bg-slate-800"
                  : "hover:bg-gray-50 dark:hover:bg-slate-800"
              }`}
            >
              <KanbanSquare size={16} style={{ color: accentColor }} />
            </button>
          </div>

          <button
            onClick={clearAll}
            className="px-3 py-1.5 text-sm rounded-md border dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-150"
          >
            Clear All
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {["All", "Unread", "Appointment", "Lab", "System"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-150 ${
              filter === f
                ? "font-medium text-white"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            }`}
            style={
              filter === f
                ? { backgroundColor: accentColor, borderColor: accentColor }
                : { borderColor: "var(--tw-prose-hr)" }
            }
          >
            {f}
          </button>
        ))}
      </div>

      {/* Notification Display */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className={`${
          viewMode === "grid"
            ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : viewMode === "list"
            ? "flex flex-col gap-3"
            : "flex gap-4 overflow-x-auto pb-4"
        }`}
      >
        {filtered.length === 0 && (
          <div className="col-span-full text-sm text-gray-500 dark:text-gray-400 text-center py-10">
            No notifications
          </div>
        )}

        {filtered.map((n) => (
          <motion.div
            key={n.id}
            onClick={() => {
              markRead(n.id);
              setSelected(n);
            }}
            whileHover={{ scale: 1.02 }}
            className={`cursor-pointer rounded-xl p-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-150 ${
              viewMode === "list" ? "flex justify-between items-center" : ""
            } ${
              viewMode === "kanban"
                ? "min-w-[280px] flex-shrink-0"
                : "w-full"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className="p-2 rounded-full bg-gray-50 dark:bg-slate-800 shadow-sm"
                style={{ color: accentColor }}
              >
                {getIcon(n.type)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-base dark:text-gray-100">
                  {n.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {n.body}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Clock size={12} /> {n.time}
              </div>
              {n.read ? (
                <span className="text-green-500 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Read
                </span>
              ) : (
                <span
                  className="text-xs font-medium"
                  style={{ color: accentColor }}
                >
                  New
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Details Drawer */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-0 right-0 w-full md:w-[420px] md:right-6 md:bottom-6 z-50 bg-white dark:bg-slate-900 border dark:border-slate-800 shadow-2xl rounded-t-2xl md:rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b dark:border-slate-800">
              <h2 className="text-lg font-semibold dark:text-gray-100 flex items-center gap-2">
                {getIcon(selected.type)} {selected.title}
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {selected.details}
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Clock size={12} /> {selected.time}
              </div>
            </div>

            <div className="p-4 border-t dark:border-slate-800 flex justify-end">
              <button
                onClick={() => handleDownload(selected)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150"
                style={{
                  color: accentColor,
                  border: `1px solid ${accentColor}`,
                  backgroundColor: `${accentColor}10`,
                }}
              >
                <Download size={14} /> Download PDF
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
