import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaDownload,
  FaToggleOn,
  FaToggleOff,
  FaPlus,
} from "react-icons/fa";

// South Indian / Tamil Nadu mock patients
const initialPatients = [
  { id: 1, name: "Arun Kumar", email: "arun.kumar@gmail.com", phone: "98401 23456", status: "Active", premium: true, canViewReports: true, canDownloadPrescription: true, canViewDoctorDetails: true },
  { id: 2, name: "Priya Ramesh", email: "priya.ramesh@gmail.com", phone: "94432 56789", status: "Active", premium: true, canViewReports: true, canDownloadPrescription: true, canViewDoctorDetails: true },
  { id: 3, name: "Karthik V", email: "karthik.v@gmail.com", phone: "98765 43210", status: "Active", premium: true, canViewReports: true, canDownloadPrescription: true, canViewDoctorDetails: false },
  { id: 4, name: "Meena S", email: "meena.s@gmail.com", phone: "99555 12345", status: "Active", premium: true, canViewReports: true, canDownloadPrescription: true, canViewDoctorDetails: true },
  { id: 5, name: "Ravi Shankar", email: "ravi.shankar@gmail.com", phone: "98403 67890", status: "Active", premium: true, canViewReports: true, canDownloadPrescription: true, canViewDoctorDetails: true },
];

const Patients = () => {
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [modalPatient, setModalPatient] = useState({
    name: "",
    email: "",
    phone: "",
    premium: true,
    canViewReports: true,
    canDownloadPrescription: true,
    canViewDoctorDetails: true,
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      setPatients(patients.filter((p) => p.id !== id));
      if (selectedPatient?.id === id) setSelectedPatient(null);
    }
  };

  const togglePremium = (id) => {
    setPatients(
      patients.map((p) => (p.id === id ? { ...p, premium: !p.premium, status: !p.premium ? "Active" : "Inactive" } : p))
    );
    if (selectedPatient?.id === id) {
      setSelectedPatient({
        ...selectedPatient,
        premium: !selectedPatient.premium,
        status: !selectedPatient.premium ? "Active" : "Inactive",
      });
    }
  };

  const toggleField = (id, field) => {
    setPatients(
      patients.map((p) => (p.id === id ? { ...p, [field]: !p[field] } : p))
    );
    if (selectedPatient?.id === id) {
      setSelectedPatient({ ...selectedPatient, [field]: !selectedPatient[field] });
    }
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setModalPatient({
      name: "",
      email: "",
      phone: "",
      premium: true,
      canViewReports: true,
      canDownloadPrescription: true,
      canViewDoctorDetails: true,
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (patient) => {
    setModalPatient({ ...patient });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleSavePatient = () => {
    if (isEditMode) {
      // Edit existing patient
      setPatients(
        patients.map((p) => (p.id === modalPatient.id ? { ...modalPatient, status: modalPatient.premium ? "Active" : "Inactive" } : p))
      );
      if (selectedPatient?.id === modalPatient.id) {
        setSelectedPatient({ ...modalPatient, status: modalPatient.premium ? "Active" : "Inactive" });
      }
    } else {
      // Add new patient
      const newId = patients.length ? Math.max(...patients.map((p) => p.id)) + 1 : 1;
      setPatients([{ ...modalPatient, id: newId, status: modalPatient.premium ? "Active" : "Inactive" }, ...patients]);
    }
    setIsModalOpen(false);
  };

  return (
   
      <div className="p-6 flex flex-col lg:flex-row gap-6">
        {/* --- Patient List --- */}
        <div className="w-full lg:w-1/3">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-semibold text-gray-800">Patients</h1>
            <button
              className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
              onClick={openAddModal}
            >
              <FaPlus /> Add Patient
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            List and select a patient to manage details.
          </p>

          <input
            type="text"
            placeholder="Search patients..."
            className="mb-4 p-2 w-full border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="overflow-y-auto max-h-[70vh] bg-white rounded-lg shadow divide-y">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="p-3 cursor-pointer hover:bg-indigo-50 flex justify-between items-center"
                onClick={() => setSelectedPatient(patient)}
              >
                <span className={`font-medium ${patient.status === "Inactive" ? "text-red-600" : "text-gray-800"}`}>
                  {patient.name}
                </span>
                <span className={`text-sm font-semibold ${patient.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                  {patient.status}
                </span>
                <button
                  className="ml-2 text-yellow-500 hover:text-yellow-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(patient);
                  }}
                  title="Edit Patient"
                >
                  <FaEdit />
                </button>
              </div>
            ))}
            {filteredPatients.length === 0 && (
              <div className="p-3 text-center text-gray-500">No patients found.</div>
            )}
          </div>
        </div>

        {/* --- Patient Detail --- */}
        {selectedPatient && (
          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {selectedPatient.name} - Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{selectedPatient.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium">{selectedPatient.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <span className={`mt-1 px-3 py-1 rounded font-semibold ${selectedPatient.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                  {selectedPatient.status}
                </span>
              </div>
              <div>
                <p className="text-gray-500">Premium Access</p>
                <button onClick={() => togglePremium(selectedPatient.id)} className="mt-1 text-xl">
                  {selectedPatient.premium ? <FaToggleOn className="text-green-500" /> : <FaToggleOff className="text-gray-400" />}
                </button>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-500 mb-2">Permissions</p>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-1">
                  <input type="checkbox" checked={selectedPatient.canViewReports} onChange={() => toggleField(selectedPatient.id, "canViewReports")} className="form-checkbox h-4 w-4" />
                  View Reports
                </label>
                <label className="flex items-center gap-1">
                  <input type="checkbox" checked={selectedPatient.canDownloadPrescription} onChange={() => toggleField(selectedPatient.id, "canDownloadPrescription")} className="form-checkbox h-4 w-4" />
                  Download Prescription
                </label>
                <label className="flex items-center gap-1">
                  <input type="checkbox" checked={selectedPatient.canViewDoctorDetails} onChange={() => toggleField(selectedPatient.id, "canViewDoctorDetails")} className="form-checkbox h-4 w-4" />
                  View Doctor Details
                </label>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition">
                <FaEye /> View
              </button>
              <button
                onClick={() => openEditModal(selectedPatient)}
                className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-yellow-600 transition"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(selectedPatient.id)}
                className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700 transition"
              >
                <FaTrash /> Delete
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 transition">
                <FaDownload /> Download Prescription
              </button>
            </div>
          </div>
        )}

        {/* --- Add/Edit Patient Modal --- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">{isEditMode ? "Edit Patient" : "Add New Patient"}</h2>
              <div className="flex flex-col gap-3">
                <input type="text" placeholder="Name" className="p-2 border rounded" value={modalPatient.name} onChange={(e) => setModalPatient({ ...modalPatient, name: e.target.value })} />
                <input type="email" placeholder="Email" className="p-2 border rounded" value={modalPatient.email} onChange={(e) => setModalPatient({ ...modalPatient, email: e.target.value })} />
                <input type="text" placeholder="Phone" className="p-2 border rounded" value={modalPatient.phone} onChange={(e) => setModalPatient({ ...modalPatient, phone: e.target.value })} />

                <div className="flex items-center gap-2">
                  <p className="text-gray-500">Premium Access</p>
                  <button onClick={() => setModalPatient({ ...modalPatient, premium: !modalPatient.premium })}>
                    {modalPatient.premium ? <FaToggleOn className="text-green-500 text-2xl" /> : <FaToggleOff className="text-gray-400 text-2xl" />}
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={modalPatient.canViewReports} onChange={() => setModalPatient({ ...modalPatient, canViewReports: !modalPatient.canViewReports })} />
                    View Reports
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={modalPatient.canDownloadPrescription} onChange={() => setModalPatient({ ...modalPatient, canDownloadPrescription: !modalPatient.canDownloadPrescription })} />
                    Download Prescription
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={modalPatient.canViewDoctorDetails} onChange={() => setModalPatient({ ...modalPatient, canViewDoctorDetails: !modalPatient.canViewDoctorDetails })} />
                    View Doctor Details
                  </label>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition" onClick={handleSavePatient}>
                    {isEditMode ? "Save Changes" : "Add Patient"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    
  );
};

export default Patients;
