import { useState, useEffect } from "react";
import { mockDiagnosisData } from "../data/mockData";

export const usePatientData = (id = 1) => {
  // Note: mockDiagnosisData is a named export; if it contains an array of patients use find()
  const [patient, setPatient] = useState(
    Array.isArray(mockDiagnosisData) ? mockDiagnosisData.find((p) => p.id === id) : null
  );

  // 🔄 Simulate real-time updates to vitals
  useEffect(() => {
    const interval = setInterval(() => {
      setPatient(prev => {
        if (!prev) return prev;
        const random = (min, max) => (Math.random() * (max - min) + min).toFixed(1);
        return {
          ...prev,
          vitals: {
            ...prev.vitals,
            heartRate: Math.floor(random(70, 90)),
            oxygen: Math.floor(random(96, 99)),
            temperature: random(97.5, 99.1),
            bloodPressure: `${Math.floor(random(110, 125))}/${Math.floor(random(75, 85))}`,
            weight: prev.vitals.weight + (Math.random() < 0.5 ? 0 : 0.1),
          },
        };
      });
    }, 5000); // update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return patient;
};
