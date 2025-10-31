// src/pages/Patient/Appointments.js
import React, { useState, useMemo, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Bell,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Info,
  LayoutGrid,
  Rows,
  Kanban,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import { useTheme } from "../../context/ThemeContext";
import { mockDiagnosisData, mockAppointments } from "../../data/mockData"; // named mock data import & convenience appointments

/* ---------------- HELPERS ---------------- */
const STATUS_COLORS = {
  Upcoming: "#16a34a", // green
  Completed: "#2563eb", // blue
  Cancelled: "#ef4444", // red
  Missed: "#f59e0b", // orange
};

function getStatusColor(status) {
  return STATUS_COLORS[status] || "#7c3aed";
}

/* ---------------- COMPONENT ---------------- */
export default function AppointmentPlanner() {
  const { darkMode, accentColor } = useTheme();
  const [appointmentsData, setAppointmentsData] = useState(
    Array.isArray(mockAppointments) && mockAppointments.length
      ? mockAppointments
      : mockDiagnosisData.appointments || []
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");
  const [showCount, setShowCount] = useState(6);
  const [view, setView] = useState("list"); // ✅ list | grid | kanban
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Added search term state

  useEffect(() => {
    if (!appointmentsData.length && mockDiagnosisData.appointments) {
      setAppointmentsData(mockDiagnosisData.appointments);
    }
  }, [appointmentsData]);

  const monthA = dayjs();
  const monthB = dayjs().add(1, "month");

  const combined = useMemo(() => {
    const all = [...appointmentsData].map((a) => ({
      ...a,
      key: dayjs(a.date).format("YYYY-MM-DD"),
      timestamp: new Date(a.date).getTime(),
    }));
    const map = {};
    all.forEach((it) => {
      if (!map[it.key]) map[it.key] = [];
      map[it.key].push(it);
    });
    return { all, map };
  }, [appointmentsData]);

  const filteredAndSorted = useMemo(() => {
    let items = selectedDate
      ? combined.map[selectedDate] || []
      : combined.all.slice();

    if (filter !== "All") items = items.filter((it) => it.status === filter);

    // 🔍 Search filtering — FIXED with safe optional chaining
   if (searchTerm.trim()) {
  const term = searchTerm.toLowerCase();
  items = items.filter((it) => {
    const doctor = (it.doctor || "").toLowerCase();
    const specialization = (it.specialization || "").toLowerCase();
    const location = (it.location || "").toLowerCase();
    return (
      doctor.includes(term) ||
      specialization.includes(term) ||
      location.includes(term)
    );
  });
}


    switch (sortBy) {
      case "date-asc":
        items.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "date-desc":
        items.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "doctor":
        items.sort((a, b) => (a.doctor || "").localeCompare(b.doctor || ""));
        break;
      case "status":
        items.sort((a, b) => (a.status || "").localeCompare(b.status || ""));
        break;
      default:
        break;
    }
    return items;
  }, [combined, selectedDate, filter, sortBy, searchTerm]);

  const handleDownloadPdf = (item) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Appointment Report", 18, 22);
    doc.setFontSize(11);
    doc.text(`Date: ${item.date}`, 18, 36);
    doc.text(`Time: ${item.time}`, 18, 46);
    doc.text(`Doctor: ${item.doctor}`, 18, 56);
    doc.text(`Specialization: ${item.specialization}`, 18, 66);
    doc.text(`Status: ${item.status}`, 18, 76);
    if (item.location) doc.text(`Location: ${item.location}`, 18, 86);
    if (item.notes) {
      doc.text("Notes:", 18, 100);
      doc.setFontSize(10);
      doc.text(item.notes, 18, 108, { maxWidth: 170 });
    }
    doc.save(
      `${(item.doctor || "appointment").replace(/\s+/g, "_")}_${item.date}.pdf`
    );
  };

  const renderMonth = (month) => {
    const start = month.startOf("month");
    const days = Array.from({ length: month.daysInMonth() }, (_, i) =>
      start.add(i, "day")
    );
    return (
      <motion.div
        layout
        key={month.format("YYYY-MM")}
        className={`w-full rounded-2xl p-3 border ${
          darkMode
            ? "bg-slate-900 border-slate-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold" style={{ color: accentColor }}>
            {month.format("MMMM YYYY")}
          </div>
        </div>
        <div className="grid grid-cols-7 text-center text-xs font-medium mb-2 opacity-70">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d) => {
            const key = d.format("YYYY-MM-DD");
            const events = combined.map[key] || [];
            const isToday = d.isSame(dayjs(), "day");
            const isSelected = selectedDate === key;

            return (
              <button
                key={key}
                onClick={() =>
                  setSelectedDate(key === selectedDate ? null : key)
                }
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition transform hover:scale-105 ${
                  darkMode ? "hover:bg-slate-800" : "hover:bg-gray-100"
                } ${isSelected ? "ring-2 ring-offset-2" : ""}`}
                style={
                  isSelected
                    ? { borderColor: accentColor, color: accentColor }
                    : {}
                }
              >
                <div
                  className={`text-sm font-medium ${
                    isToday ? "underline" : ""
                  }`}
                >
                  {d.date()}
                </div>
                <div className="flex items-center gap-0.5 mt-1">
                  {events.slice(0, 4).map((ev) => (
                    <span
                      key={ev.id}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getStatusColor(ev.status) }}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    );
  };

  const handleResetAll = () => {
    setFilter("All");
    setSortBy("date-desc");
    setSelectedDate(null);
    setShowCount(6);
    setSearchTerm("");
  };

  return (
    <div
      className={`min-h-screen py-6 px-6 lg:px-10 transition-colors ${
        darkMode ? "bg-slate-950 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: accentColor }}>
            <Calendar size={20} className="inline mr-2" /> Appointments Planner
          </h1>
          <p
            className={`mt-1 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Two-month stacked calendar — click any date to view appointments.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 🔍 Search Bar */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctor, specialization..."
            className={`px-3 py-2 rounded-md text-sm focus:outline-none border ${
              darkMode
                ? "bg-slate-800 text-gray-100 border-slate-700 placeholder-gray-500"
                : "bg-white text-gray-800 border-gray-300 placeholder-gray-400"
            }`}
          />

          <button
            onClick={handleResetAll}
            className={`px-3 py-2 rounded-md font-medium transition ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            All
          </button>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-3 py-2 rounded-md text-sm ${
              darkMode
                ? "bg-slate-800 text-gray-100"
                : "bg-white text-gray-800"
            }`}
          >
            <option value="date-desc">Date (new → old)</option>
            <option value="date-asc">Date (old → new)</option>
            <option value="doctor">Doctor (A → Z)</option>
            <option value="status">Status (A → Z)</option>
          </select>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`px-3 py-2 rounded-md text-sm ${
              darkMode
                ? "bg-slate-800 text-gray-100"
                : "bg-white text-gray-800"
            }`}
          >
            <option value="All">All</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Missed">Missed</option>
          </select>

          {/* ✅ View toggle */}
          <div className="flex items-center gap-1 border rounded-md px-2 py-1">
            <button
              onClick={() => setView("list")}
              className={`p-1 ${view === "list" ? "text-teal-600" : ""}`}
            >
              <Rows size={16} />
            </button>
            <button
              onClick={() => setView("grid")}
              className={`p-1 ${view === "grid" ? "text-teal-600" : ""}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setView("kanban")}
              className={`p-1 ${view === "kanban" ? "text-teal-600" : ""}`}
            >
              <Kanban size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="col-span-1 flex flex-col gap-4">
          {renderMonth(monthA)}
          {renderMonth(monthB)}
        </div>

        {/* Appointment List */}
        <div
          className={`col-span-2 rounded-2xl p-4 border ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-gray-200"
          }`}
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: accentColor }}>
            <Bell size={16} className="inline mr-2" />
            {selectedDate
              ? `Events on ${dayjs(selectedDate).format("MMM D, YYYY")}`
              : "All Appointments"}
          </h2>

          {/* View modes */}
          {view === "list" && (
            <div className="space-y-3">
              {filteredAndSorted.slice(0, showCount).map((it) => (
                <motion.div
                  key={it.id}
                  onClick={() =>
                    setExpandedId(expandedId === it.id ? null : it.id)
                  }
                  className={`p-3 rounded-lg border transition cursor-pointer ${
                    darkMode
                      ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold">{it.doctor}</div>
                        <div
                          className="text-xs rounded-full px-2 py-0.5 text-white"
                          style={{ backgroundColor: getStatusColor(it.status) }}
                        >
                          {it.status}
                        </div>
                      </div>
                      <div className="text-sm">
                        {it.specialization} • {it.time}
                      </div>
                      <div className="text-xs mt-1 flex items-center gap-2">
                        <MapPin size={12} /> {it.location || "—"}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadPdf(it);
                      }}
                      className="p-1 hover:scale-110 transition"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {view === "grid" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredAndSorted.map((it) => (
                <div
                  key={it.id}
                  className={`p-4 rounded-xl border shadow ${
                    darkMode ? "bg-slate-800" : "bg-white"
                  }`}
                >
                  <h3 className="font-semibold">{it.doctor}</h3>
                  <p className="text-sm">{it.specialization}</p>
                  <p className="text-xs mt-2">
                    {it.date} • {it.time}
                  </p>
                  <span
                    className="inline-block text-xs px-2 py-0.5 rounded-full mt-2 text-white"
                    style={{ backgroundColor: getStatusColor(it.status) }}
                  >
                    {it.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {view === "kanban" && (
            <div className="grid grid-cols-4 gap-4">
              {["Upcoming", "Completed", "Cancelled", "Missed"].map(
                (status) => (
                  <div
                    key={status}
                    className={`p-3 rounded-xl border ${
                      darkMode ? "bg-slate-800" : "bg-white"
                    }`}
                  >
                    <h4
                      className="font-semibold mb-2"
                      style={{ color: getStatusColor(status) }}
                    >
                      {status}
                    </h4>
                    <div className="space-y-2">
                      {filteredAndSorted
                        .filter((a) => a.status === status)
                        .map((it) => (
                          <div
                            key={it.id}
                            className="p-2 rounded-md text-sm border"
                          >
                            <p className="font-medium">{it.doctor}</p>
                            <p>{it.date}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
