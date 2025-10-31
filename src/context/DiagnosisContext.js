// src/context/DiagnosisContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { mockDiagnosisData } from "../data/mockData";

const DiagnosisContext = createContext();

export const DiagnosisProvider = ({ children }) => {
  // Ensure diagnoses is an array. The shared mock data file exports an object
  // with nested arrays (appointments, labReports, etc.). Guard so we don't try to
  // spread a non-iterable value later (which caused the runtime error).
  const initialDiagnoses = Array.isArray(mockDiagnosisData)
    ? mockDiagnosisData
    : mockDiagnosisData.diagnoses || mockDiagnosisData.patients || [];

  const [diagnoses, setDiagnoses] = useState(initialDiagnoses);

  // 🧩 Simulate real-time updates (mock WebSocket)
  useEffect(() => {
    const interval = setInterval(() => {
      // Example: new diagnosis added automatically every few minutes (for demo)
      if (Math.random() > 0.7) {
        const newDiagnosis = {
          id: diagnoses.length + 1,
          patientName: "Auto-generated Patient " + (diagnoses.length + 1),
          date: new Date().toISOString().split("T")[0],
          doctor: "Dr. Auto Sync",
          department: "General Medicine",
          diagnosis: "Routine Sync Check",
          vitals: {
            heartRate: Math.floor(70 + Math.random() * 15),
            bloodPressure: `${110 + Math.floor(Math.random() * 20)}/${70 + Math.floor(Math.random() * 10)}`,
            temperature: 98.4 + Math.random() * 0.5,
            oxygenSaturation: 97 + Math.floor(Math.random() * 3),
          },
          prescriptions: [{ name: "Vitamin D", dosage: "Once Daily" }],
          reports: [{ name: "Auto Check Report", status: "Normal", date: new Date().toISOString().split("T")[0] }],
          nextAppointment: "2025-12-10",
          notes: "System added for testing real-time sync.",
        };

        setDiagnoses((prev) =>
          Array.isArray(prev) ? [...prev, newDiagnosis] : [newDiagnosis]
        );
      }
    }, 10000); // every 10 seconds for demo

    return () => clearInterval(interval);
  }, [diagnoses]);

  const addDiagnosis = (diagnosis) => {
    setDiagnoses((prev) => {
      if (Array.isArray(prev)) return [...prev, { id: prev.length + 1, ...diagnosis }];
      return [{ id: 1, ...diagnosis }];
    });
  };

  return (
    <DiagnosisContext.Provider value={{ diagnoses, addDiagnosis }}>
      {children}
    </DiagnosisContext.Provider>
  );
};

export const useDiagnosis = () => useContext(DiagnosisContext);
