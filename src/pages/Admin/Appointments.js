// src/pages/Admin/Appointments.js
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const localizer = momentLocalizer(moment);

const Appointments = () => {
  const { darkMode } = useTheme();

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Consultation - Dr. Mehta",
      start: new Date(2025, 9, 27, 10, 0),
      end: new Date(2025, 9, 27, 11, 0),
      status: "finished",
      details: "Follow-up consultation with patient Rahul Verma.",
    },
    {
      id: 2,
      title: "Post-op Review - Patient Priya",
      start: new Date(2025, 9, 28, 15, 0),
      end: new Date(2025, 9, 28, 16, 0),
      status: "upcoming",
      details: "Surgery review and recovery tracking.",
    },
    {
      id: 3,
      title: "Health Check - Patient John",
      start: new Date(2025, 9, 25, 9, 0),
      end: new Date(2025, 9, 25, 10, 0),
      status: "missed",
      details: "General health screening missed by patient.",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    status: "upcoming",
    details: "",
  });

  const eventStyleGetter = (event) => {
    let bgColor = "#ffd013ff"; // yellow (upcoming)
    if (event.status === "finished") bgColor = "#22c55e"; // green
    if (event.status === "missed") bgColor = "#ef4444"; // red
    return {
      style: {
        backgroundColor: bgColor,
        borderRadius: "6px",
        color: "#fff",
        border: "none",
        fontSize: "0.85rem",
        cursor: "pointer",
      },
    };
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) return;
    setEvents([
      ...events,
      {
        id: Date.now(),
        ...newEvent,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end),
      },
    ]);
    setShowAddModal(false);
    setNewEvent({ title: "", start: "", end: "", status: "upcoming", details: "" });
  };

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    setShowDetail(null);
  };

  return (
    <div
      className={`p-6 w-full min-h-screen overflow-y-auto transition-all duration-500 ${
        darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <FiPlus /> Add Appointment
        </motion.button>
      </div>

      {/* Calendar */}
      <div className="rounded-xl border dark:border-gray-800 shadow-md overflow-hidden w-full max-w-full">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "75vh", width: "100%" }}
          eventPropGetter={eventStyleGetter}
          popup
          views={["month", "week", "day"]}
          onSelectEvent={(event) => setShowDetail(event)}
        />
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4">
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-500 rounded"></span> Finished
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 bg-yellow-400 rounded"></span> Upcoming
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-500 rounded"></span> Missed
        </span>
      </div>

      {/* ─────────────────────────────── */}
      {/* Add Appointment Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`p-6 rounded-2xl shadow-xl w-[90%] max-w-md ${
                darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Add Appointment</h2>
                <button onClick={() => setShowAddModal(false)}>
                  <FiX className="text-xl hover:text-red-500" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Appointment Title"
                  className="border rounded-md p-2 dark:bg-gray-800 dark:border-gray-700"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
                <textarea
                  placeholder="Details"
                  rows={3}
                  className="border rounded-md p-2 dark:bg-gray-800 dark:border-gray-700"
                  value={newEvent.details}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, details: e.target.value })
                  }
                />
                <input
                  type="datetime-local"
                  className="border rounded-md p-2 dark:bg-gray-800 dark:border-gray-700"
                  value={newEvent.start}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, start: e.target.value })
                  }
                />
                <input
                  type="datetime-local"
                  className="border rounded-md p-2 dark:bg-gray-800 dark:border-gray-700"
                  value={newEvent.end}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, end: e.target.value })
                  }
                />
                <select
                  className="border rounded-md p-2 dark:bg-gray-800 dark:border-gray-700"
                  value={newEvent.status}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, status: e.target.value })
                  }
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="finished">Finished</option>
                  <option value="missed">Missed</option>
                </select>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddEvent}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-2"
                >
                  Save Appointment
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────── */}
      {/* Appointment Detail Popup */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className={`p-6 rounded-2xl shadow-xl w-[90%] max-w-md ${
                darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">{showDetail.title}</h2>
                <button onClick={() => setShowDetail(null)}>
                  <FiX className="text-xl hover:text-red-500" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                {moment(showDetail.start).format("DD MMM YYYY, hh:mm A")} -{" "}
                {moment(showDetail.end).format("hh:mm A")}
              </p>
              <p className="mb-3">{showDetail.details}</p>
              <div className="flex justify-end gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(showDetail.id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700"
                >
                  <FiTrash2 /> Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Appointments;
