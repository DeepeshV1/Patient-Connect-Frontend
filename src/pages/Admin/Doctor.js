// src/pages/Admin/Doctor.js
import React, { useState, useContext, createContext } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { FaEye, FaEdit, FaTrash, FaDownload, FaToggleOn, FaToggleOff, FaPlus } from "react-icons/fa";

// Mock AuthContext
const AuthContext = createContext({ role: "Admin" }); // change to "Patient" to test patient view

// RBAC helper
const can = (role, action) => {
  const permissions = {
    Admin: ["viewDoctors", "editDoctors", "deleteDoctors", "togglePremium"],
    Patient: ["viewSelf", "downloadPrescription"],
  };
  return permissions[role]?.includes(action);
};

// Sample Doctor data (South Indian/Tamil Nadu style)
const initialDoctors = [
  { id: 1, name: "Dr. Arun Kumar", email: "arun.kumar@clinic.com", phone: "98401 23456", status: "Active", premium: true },
  { id: 2, name: "Dr. Priya Ramesh", email: "priya.ramesh@clinic.com", phone: "94432 56789", status: "Active", premium: true },
  { id: 3, name: "Dr. Karthik V", email: "karthik.v@clinic.com", phone: "98765 43210", status: "Active", premium: true },
  { id: 4, name: "Dr. Meena S", email: "meena.s@clinic.com", phone: "99555 12345", status: "Active", premium: true },
];

const Doctor = () => {
  const { role } = useContext(AuthContext);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filteredDoctors = doctors.filter(
    (d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase())
  );

  const togglePremium = (id) => {
    setDoctors(
      doctors.map((d) =>
        d.id === id ? { ...d, premium: !d.premium, status: !d.premium ? "Inactive" : "Active" } : d
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors(doctors.filter((d) => d.id !== id));
      if (selectedDoctor?.id === id) setSelectedDoctor(null);
    }
  };

  return (
    <div>
      <div className="p-6 flex flex-col lg:flex-row gap-6">
        {/* Doctor List */}
        <div className="w-full lg:w-1/3">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-semibold text-gray-800">Doctors</h1>
            {can(role, "editDoctors") && (
              <button className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition">
                <FaPlus /> Add Doctor
              </button>
            )}
          </div>
          <input
            type="text"
            placeholder="Search doctors..."
            className="mb-4 p-2 w-full border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="overflow-y-auto max-h-[70vh] bg-white rounded-lg shadow divide-y">
            {filteredDoctors.map((d) => (
              <div
                key={d.id}
                className="p-3 cursor-pointer hover:bg-indigo-50 flex justify-between items-center"
                onClick={() => setSelectedDoctor(d)}
              >
                <span className={`font-medium ${d.status === "Inactive" ? "text-red-600" : "text-gray-800"}`}>
                  {d.name}
                </span>
                <span className={`text-sm font-semibold ${d.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                  {d.status}
                </span>
                {can(role, "editDoctors") && (
                  <button
                    className="ml-2 text-yellow-500 hover:text-yellow-700"
                    title="Edit Doctor"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDoctor(d);
                    }}
                  >
                    <FaEdit />
                  </button>
                )}
              </div>
            ))}
            {filteredDoctors.length === 0 && (
              <div className="p-3 text-center text-gray-500">No doctors found.</div>
            )}
          </div>
        </div>

        {/* Doctor Details */}
        {selectedDoctor && (
          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-800">{selectedDoctor.name} - Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{selectedDoctor.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium">{selectedDoctor.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <span className={`mt-1 px-3 py-1 rounded font-semibold ${selectedDoctor.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                  {selectedDoctor.status}
                </span>
              </div>
              <div>
                <p className="text-gray-500">Premium Access</p>
                {can(role, "togglePremium") && (
                  <button onClick={() => togglePremium(selectedDoctor.id)} className="mt-1 text-xl">
                    {selectedDoctor.premium ? <FaToggleOn className="text-green-500" /> : <FaToggleOff className="text-gray-400" />}
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition">
                <FaEye /> View
              </button>
              {can(role, "editDoctors") && (
                <button className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-yellow-600 transition">
                  <FaEdit /> Edit
                </button>
              )}
              {can(role, "deleteDoctors") && (
                <button onClick={() => handleDelete(selectedDoctor.id)} className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700 transition">
                  <FaTrash /> Delete
                </button>
              )}
              {/* Always visible download */}
              <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 transition">
                <FaDownload /> Download Prescription
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctor;
