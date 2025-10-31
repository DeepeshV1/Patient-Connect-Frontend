// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { DiagnosisProvider } from "./context/DiagnosisContext";   // ✅ new
import ProtectedRoute from "./routes/ProtectedRoute";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import PatientLayout from "./layouts/PatientLayout";

// Admin pages
import Dashboard from "./pages/Admin/Dashboard";
import Patients from "./pages/Admin/Patients";
import Doctor from "./pages/Admin/Doctor";
import Messages from "./pages/Admin/Messages";
import Appointments from "./pages/Admin/Appointments";
import Reminders from "./pages/Admin/Reminders";
import Reports from "./pages/Admin/Reports";
import RecordsDB from "./pages/Admin/RecordsDB";
import Analytics from "./pages/Admin/Analytics";
import Settings from "./pages/Admin/Settings";

// Patient pages
import PatientDashboard from "./pages/Patient/Dashboard";
import Prescription from "./pages/Patient/Prescription";
import LabReports from "./pages/Patient/LabReports";
import PatientAppointments from "./pages/Patient/Appointments";
import Notifications from "./pages/Patient/Notifications";
import Education from "./pages/Patient/Education";
import Blogs from "./pages/Patient/Blogs";
import Account from "./pages/Patient/Account";
import PatientSettings from "./pages/Patient/Settings";
import DiagnosisListPage from "./pages/Patient/DiagnosisListPage";

// Auth
import AuthPage from "./pages/Auth/AuthPage";

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <DiagnosisProvider>
        <Router>
          <Routes>
            {/* Auth routes */}
            <Route path="/" element={<AuthPage />} />
            <Route path="/auth" element={<AuthPage />} />

            {/* Patient protected routes */}
            <Route path="/patient/*"
  element={
    <ProtectedRoute allowedRole="patient">
      <PatientLayout>
        <Routes>
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="prescription" element={<Prescription />} />
          <Route path="lab-reports" element={<LabReports />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="education" element={<Education />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="account" element={<Account />} />
          <Route path="settings" element={<PatientSettings />} />
          <Route path="messages" element={<Messages />} /> {/* ✅ Add this line */}
          <Route path="diagnosis" element={<DiagnosisListPage />} />
          <Route path="diagnosis/:id" element={<PatientDashboard />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </PatientLayout>
    </ProtectedRoute>
  }
/>


            {/* Admin protected routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="patients" element={<Patients />} />
                      <Route path="doctors" element={<Doctor />} />
                      <Route path="messages" element={<Messages />} />
                      <Route path="appointments" element={<Appointments />} />
                      <Route path="reminders" element={<Reminders />} />
                      <Route path="reports" element={<Reports />} />
                      <Route path="records-db" element={<RecordsDB />} />
                      <Route path="analytics" element={<Analytics />} />
                      <Route path="settings" element={<Settings />} />
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </Router>
      </DiagnosisProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
