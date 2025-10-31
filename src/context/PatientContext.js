import React, { createContext, useContext, useState, useEffect } from "react";

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patient, setPatient] = useState(null);
  const [patientsList, setPatientsList] = useState([]);

  useEffect(() => {
    // ✅ Mock load patients
    const mockPatients = [
      { id: "P001", name: "Deepesh Kumar", age: 28, email: "deepesh@example.com" },
      { id: "P002", name: "Aarav Iyer", age: 35, email: "aarav@example.com" },
      { id: "P003", name: "Priya Ramesh", age: 31, email: "priya@example.com" },
    ];
    setPatientsList(mockPatients);
    setPatient(mockPatients[0]);
  }, []);

  const switchPatient = (id) => {
    const selected = patientsList.find((p) => p.id === id);
    if (selected) {
      setPatient(selected);
      localStorage.setItem("currentPatient", JSON.stringify(selected));
    }
  };

  return (
    <PatientContext.Provider value={{ patient, patientsList, switchPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => useContext(PatientContext);
