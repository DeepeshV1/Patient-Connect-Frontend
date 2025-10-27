// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ Import ThemeProvider

// Admin pages
import Dashboard from "./pages/Admin/Dashboard";
import Patients from "./pages/Admin/Patients";
import Doctor from "./pages/Admin/Doctor";
import Messages from "./pages/Admin/Messages";
import Appointments from "./pages/Admin/Appointments";
import Reminders from "./pages/Admin/Reminders";
import Reports from "./pages/Admin/Reports";
import RecordsDB from "./pages/Admin/RecordsDB";
import Pharmacy from "./pages/Admin/Pharmacy";
import Settings from "./pages/Admin/Settings";

const App = () => {
  return (
    // ✅ Wrap everything inside ThemeProvider
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
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
                  <Route path="pharmacy" element={<Pharmacy />} />
                  <Route path="settings" element={<Settings />} />
                  {/* Default route */}
                  <Route path="*" element={<Dashboard />} />
                </Routes>
              </AdminLayout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
