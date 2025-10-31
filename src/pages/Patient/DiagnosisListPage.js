// src/pages/Patient/DiagnosisListPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiClipboard, FiActivity } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { mockDiagnosisData } from "../../data/mockData";

const DiagnosisListPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  // derive a safe patients array from shared mock data
  const patients = Array.isArray(mockDiagnosisData)
    ? mockDiagnosisData
    : mockDiagnosisData.patients || [];

  const textColor = darkMode ? "text-gray-100" : "text-gray-800";
  const subTextColor = darkMode ? "text-gray-400" : "text-gray-600";

  return (
    <div className="p-6 space-y-8">
      <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>Diagnosis Records</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  {patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 text-teal-600 rounded-lg">
                  <FiUser />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${textColor}`}>
                    {patient.patientName}
                  </h3>
                  <p className={`text-sm ${subTextColor}`}>
                    {patient.age} yrs • {patient.gender}
                  </p>
                </div>
              </div>
              <span className="bg-teal-50 dark:bg-teal-900/40 text-teal-600 text-xs px-3 py-1 rounded-full font-semibold">
                {patient.condition}
              </span>
            </div>

            <div className="mt-4 space-y-1">
              <p className={`text-sm ${subTextColor}`}>
                <FiClipboard className="inline mr-1 text-teal-500" />
                Last Diagnosis: {patient.diagnosisSummary}
              </p>
              <p className={`text-sm ${subTextColor}`}>
                <FiActivity className="inline mr-1 text-blue-500" />
                Last Visit: {patient.lastVisit}
              </p>
            </div>

            <button
              onClick={() => navigate(`/patient/diagnosis/${patient.id}`)}
              className="mt-4 bg-teal-600 text-white w-full py-2 rounded-xl font-semibold hover:bg-teal-700 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiagnosisListPage;
