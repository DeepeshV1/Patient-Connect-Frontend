import React, { useState } from "react";
import { User, Save, Upload, MoreVertical, Trash2, Power, Check } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { mockDiagnosisData } from "../../data/mockData";

const Account = () => {
  const { accentColor, darkMode } = useTheme();

  const defaultPatient = {
    id: "PAT-2431",
    name: "Aravind Kumar",
    email: "Arvd@gm.com",
    phone: "+91 9123456789",
    dob: "1993-01-31",
    pfp: "https://i.ibb.co/YgFJMvx/profile.png",
  };

  const patientData =
    mockDiagnosisData?.accounts?.[0] && mockDiagnosisData.accounts[0].pfp
      ? mockDiagnosisData.accounts[0]
      : defaultPatient;

  const [patient, setPatient] = useState(patientData);
  const [preview, setPreview] = useState(patient.pfp || defaultPatient.pfp);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deactivateDays, setDeactivateDays] = useState("");
  const [applied, setApplied] = useState(false);

  const handleChange = (e) => setPatient({ ...patient, [e.target.name]: e.target.value });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setApplied(true);
    setTimeout(() => setApplied(false), 1000);
  };

  const handleDeactivate = () => {
    if (!deactivateDays) return alert("Select a duration for deactivation!");
    alert(`⏸ Account deactivated for ${deactivateDays} days.`);
    setMenuOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm("⚠ Are you sure you want to permanently delete your account?")) {
      alert("🗑 Account deleted successfully.");
      setMenuOpen(false);
    }
  };

  return (
    <div
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300"
      style={{
        background: darkMode
          ? "linear-gradient(to bottom right, #0f172a, #1e293b)"
          : "linear-gradient(to bottom right, #f8fafc, #ffffff)",
      }}
    >
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-semibold flex items-center gap-2"
            style={{ color: accentColor }}
          >
            <User /> My Account
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your personal and contact information.
          </p>
        </div>

        {/* Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
            title="Account actions"
          >
            <MoreVertical size={20} style={{ color: accentColor }} />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg border 
                         bg-white/95 dark:bg-slate-900/90 dark:border-slate-700 
                         backdrop-blur-md z-20 animate-in fade-in slide-in-from-top-1"
            >
              <div className="px-3 py-2 border-b dark:border-slate-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Temporarily Deactivate
                </label>
                <select
                  className="w-full border rounded-md p-1.5 mt-1 text-sm dark:bg-slate-800 
                             dark:border-slate-700 text-gray-800 dark:text-gray-100"
                  value={deactivateDays}
                  onChange={(e) => setDeactivateDays(e.target.value)}
                >
                  <option value="">Select duration...</option>
                  <option value="7">7 days</option>
                  <option value="15">15 days</option>
                  <option value="30">30 days</option>
                </select>
                <button
                  onClick={handleDeactivate}
                  className="w-full mt-2 py-1.5 text-sm rounded-md text-white font-medium flex items-center justify-center gap-2 
                             hover:scale-[1.02] active:scale-95 transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                  }}
                >
                  <Power size={14} /> Deactivate
                </button>
              </div>

              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-sm flex items-center gap-2 text-red-600 font-medium 
                           hover:bg-red-50 dark:hover:bg-red-900/20 transition-all rounded-b-xl"
              >
                <Trash2 size={16} /> Delete Account
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Profile Card */}
      <div
        className="p-6 rounded-2xl border shadow-lg backdrop-blur-xl transition-all duration-300
                   dark:bg-slate-900/70 dark:border-slate-800 bg-white/80 space-y-6"
      >
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <img
              src={"https://file.aiquickdraw.com/imgcompressed/img/compressed_d7746146b9490e367412c8e54ea16069.webp"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover object-center 
                         border-4 shadow-md transition-all duration-300"
              style={{ borderColor: accentColor }}
            />
          </div>

         <label
  htmlFor="pfp-upload"
  className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 
             rounded-md cursor-pointer border transition-all duration-200 
             hover:scale-[1.03] active:scale-95 shadow-sm"
  style={{
    color: accentColor,
    borderColor: accentColor,
    background: "transparent",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = `${accentColor}15`; // light accent tint
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "transparent";
  }}
>
  <Upload size={16} style={{ color: accentColor }} /> Upload Photo
</label>

          <input
            id="pfp-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Patient ID: {patient.id}
          </span>
        </div>

        {/* Editable Info Fields */}
        <div className="space-y-4 mt-4">
          {["name", "email", "phone", "dob"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium capitalize dark:text-gray-300">
                {field === "dob" ? "Date of Birth" : field}
              </label>
              <input
                type={field === "dob" ? "date" : "text"}
                name={field}
                value={patient[field]}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1 bg-white dark:bg-slate-800 
                           border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-100 
                           focus:ring-2 focus:ring-offset-1 outline-none transition"
                style={{ "--accent": accentColor }}
              />
            </div>
          ))}

          {/* Animated Save Button */}
          <button
            onClick={handleSave}
            className={`w-full mt-4 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 
                       border-2 transition-all duration-500 shadow-md hover:scale-[1.03] active:scale-95 ${
                         applied ? "text-white" : ""
                       }`}
            style={{
              borderColor: applied ? "#16a34a" : accentColor,
              background: applied ? "#16a34a" : "transparent",
              color: applied ? "#fff" : accentColor,
              boxShadow: applied
                ? "0 4px 16px rgba(22,163,74,0.4)"
                : `0 4px 16px ${accentColor}55`,
            }}
          >
            {applied ? <Check size={18} /> : <Save size={18} />}
            {applied ? "Applied" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Linked Accounts */}
      {mockDiagnosisData?.accounts?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">
            Linked Accounts
          </h2>
          <ul className="space-y-2">
            {mockDiagnosisData.accounts.map((acc, index) => (
              <li
                key={index}
                className="p-3 rounded-lg border dark:border-slate-700 flex justify-between 
                           items-center bg-gray-50 dark:bg-slate-800/60 hover:bg-gray-100 
                           dark:hover:bg-slate-800 transition-all"
              >
                <div>
                  <p className="font-medium dark:text-gray-100">{acc.name}</p>
                  <p className="text-xs text-gray-500">{acc.email}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    acc.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {acc.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Account;
