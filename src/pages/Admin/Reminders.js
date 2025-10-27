import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiCheckCircle, FiClock } from "react-icons/fi";

const Reminders = () => {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "Follow-up Appointment",
      description: "Patient John Doe follow-up in 3 days",
      date: "2025-10-30",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Lab Report Ready",
      description: "Send report notification to Dr. Singh",
      date: "2025-10-25",
      status: "completed",
    },
    {
      id: 3,
      title: "Medication Refill",
      description: "Notify patient to refill prescription",
      date: "2025-10-28",
      status: "pending",
    },
  ]);

  const [form, setForm] = useState({ id: null, title: "", description: "", date: "", status: "pending" });
  const [editing, setEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setReminders(reminders.map((r) => (r.id === form.id ? form : r)));
      setEditing(false);
    } else {
      setReminders([...reminders, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, title: "", description: "", date: "", status: "pending" });
  };

  const handleEdit = (reminder) => {
    setForm(reminder);
    setEditing(true);
  };

  const handleDelete = (id) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-400";
      case "upcoming":
        return "bg-blue-100 text-blue-700 border-blue-400";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-400";
    }
  };

  return (
    <div className="p-6 w-full overflow-hidden">
      <h1 className="text-2xl font-bold mb-6 text-[var(--theme-color)]">Reminders & Notifications</h1>

      {/* Form Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FiPlus /> {editing ? "Edit Reminder" : "Add New Reminder"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Title"
            className="p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            type="date"
            className="p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <select
            className="p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="pending">Pending</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
          <button
            type="submit"
            className="md:col-span-4 bg-[var(--theme-color)] hover:opacity-90 text-white font-semibold py-2 rounded-lg transition-all"
          >
            {editing ? "Update Reminder" : "Add Reminder"}
          </button>
        </form>
      </div>

      {/* Reminder List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reminders.map((reminder) => (
          <motion.div
            key={reminder.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border-l-4 ${getStatusColor(reminder.status)} rounded-lg p-4 shadow-sm transition-transform hover:scale-[1.02]`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{reminder.title}</h3>
              {reminder.status === "completed" ? (
                <FiCheckCircle className="text-green-500" size={18} />
              ) : (
                <FiClock className="text-yellow-500" size={18} />
              )}
            </div>
            <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">{reminder.description}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">📅 {reminder.date}</p>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(reminder)}
                className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-all"
              >
                <FiEdit2 />
              </button>
              <button
                onClick={() => handleDelete(reminder.id)}
                className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all"
              >
                <FiTrash2 />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reminders;
