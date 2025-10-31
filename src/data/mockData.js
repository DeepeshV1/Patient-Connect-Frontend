export const mockDiagnosisData = {
  dashboardData: {
    heartRate: 78,
    temperature: 98.4,
    bloodPressure: "118/79",
  },

  /* -------------------- APPOINTMENTS -------------------- */
  appointments: [
    {
      id: "apt1",
      date: "2025-10-30",
      time: "10:00 AM",
      doctor: "Dr. Priya Meenakshi",
      department: "Cardiology",
      specialization: "Heart Health Checkup",
      hospital: "Kovai Medical Center & Hospital, Coimbatore",
      location: "Avinashi Road, Coimbatore, Tamil Nadu",
      status: "Completed",
      notes:
        "Follow-up after ECG shows improvement. Continue same medication.",
    },
    {
      id: "apt2",
      date: "2025-10-23",
      time: "11:30 AM",
      doctor: "Dr. Aravind Kumar",
      department: "General Medicine",
      specialization: "Body Health Checkup",
      hospital: "Kovai Medical Center & Hospital, Coimbatore",
      location: "Avinashi Road, Coimbatore, Tamil Nadu",
      status: "Completed",
      notes: "Routine full-body check. All parameters normal.",
    },
    {
      id: "apt3",
      date: "2025-10-16",
      time: "09:15 AM",
      doctor: "Dr. Lakshmi Devi",
      department: "Dermatology",
      specialization: "Hair & Scalp Care Consultation",
      hospital: "Vasan Skin & Hair Care Clinic, Coimbatore",
      location: "Race Course Road, Coimbatore, Tamil Nadu",
      status: "Completed",
      notes: "Mild hair fall detected. Suggested biotin and scalp serum.",
    },
  ],

  /* -------------------- NOTIFICATIONS -------------------- */
  notifications: [
    {
      id: "not1",
      title: "Appointment Completed Successfully",
      body: "Your cardiology follow-up with Dr. Priya Meenakshi has been successfully completed.",
      details:
        "Your cardiology appointment at Kovai Medical Center was completed with improved test results.",
      time: "2025-10-30 10:45 AM",
      date: "2025-10-30",
      type: "appointment",
      read: true,
    },
    {
      id: "not2",
      title: "Body Check Report Ready",
      body: "Your complete body checkup results are available now.",
      details:
        "Lab results from your full body checkup at Kovai Medical Center show good health with minor Vitamin D deficiency.",
      time: "2025-10-24 08:15 AM",
      date: "2025-10-24",
      type: "lab",
      read: false,
    },
    {
      id: "not3",
      title: "Hair Care Analysis Report Ready",
      body: "Your scalp and hair health report is ready for review.",
      details:
        "Hair follicle density and scalp health were evaluated at Vasan Skin & Hair Care Clinic, Coimbatore.",
      time: "2025-10-17 09:30 AM",
      date: "2025-10-17",
      type: "lab",
      read: false,
    },
  ],

  /* -------------------- PRESCRIPTIONS -------------------- */
  prescriptions: [
    {
      id: "rx1",
      date: "2025-10-30",
      doctor: "Dr. Priya Meenakshi",
      hospital: "Kovai Medical Center & Hospital, Coimbatore",
      medicines: [
        { name: "Amlodipine", dose: "5 mg", frequency: "Once daily (morning)" },
        { name: "Metoprolol", dose: "25 mg", frequency: "Once daily (evening)" },
      ],
      notes: "Maintain low-sodium diet and hydrate well.",
    },
    {
      id: "rx2",
      date: "2025-10-23",
      doctor: "Dr. Aravind Kumar",
      hospital: "Kovai Medical Center & Hospital, Coimbatore",
      medicines: [
        {
          name: "Multivitamin Tablet",
          dose: "1 tab",
          frequency: "Once daily after breakfast",
        },
      ],
      notes: "Continue regular exercise; recheck in 6 months.",
    },
    {
      id: "rx3",
      date: "2025-10-16",
      doctor: "Dr. Lakshmi Devi",
      hospital: "Vasan Skin & Hair Care Clinic, Coimbatore",
      medicines: [
        {
          name: "Biotin Capsule",
          dose: "10,000 mcg",
          frequency: "Once daily after lunch",
        },
        {
          name: "Scalp Serum",
          dose: "Apply small amount",
          frequency: "Twice daily",
        },
      ],
      notes: "Avoid harsh shampoos and ensure adequate protein intake.",
    },
  ],

  /* -------------------- LAB REPORTS -------------------- */
  labReports: [
    {
      id: "lab1",
      testName: "Cardiac Function Panel",
      date: "2025-10-30",
      doctor: "Dr. Priya Meenakshi",
      hospital: "Kovai Medical Center & Hospital, Coimbatore",
      type: "Cardiology",
      status: "Completed",
      notes: "Improved cholesterol and BP levels.",
      details: [
        { name: "Total Cholesterol", value: "165 mg/dL", range: "125–200" },
        { name: "LDL", value: "95 mg/dL", range: "<130" },
        { name: "HDL", value: "48 mg/dL", range: ">40" },
        { name: "Triglycerides", value: "130 mg/dL", range: "<150" },
      ],
    },
  ],

  /* -------------------- ACCOUNTS -------------------- */
  accounts: [
    {
      id: "ACC-2314",
      name: "Aarav",
      email: "aarav.R@gmail.com",
      phone: "+91 98765 43210",
      dob: "1995-03-21",
      status: "active",
      createdAt: "2024-04-12",
      pfp: "https://ibb.co/5Wgy2pJV",
    },
    
   
  ],
};

/* -------------------- EXPORTS -------------------- */
export const mockAppointments = mockDiagnosisData.appointments || [];
export const mockNotifications = mockDiagnosisData.notifications || [];
export const mockPrescriptions = mockDiagnosisData.prescriptions || [];
export const mockLabReports = mockDiagnosisData.labReports || [];
export const mockAccounts = mockDiagnosisData.accounts || [];
