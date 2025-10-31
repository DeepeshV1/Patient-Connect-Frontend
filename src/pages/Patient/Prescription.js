// src/pages/Patient/Prescription.js
import React, { useState, useMemo } from "react";
import { downloadTextAsPdf } from "../../utils/filehelpers";
import { Pill, Download, Share2, Search } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { mockDiagnosisData } from "../../data/mockData";
import { useParams } from "react-router-dom";

export default function Prescription() {
  const { id } = useParams();
  const { accentColor, darkMode } = useTheme();

  const [items] = useState(mockDiagnosisData.prescriptions || []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!term) return items;

    return items.filter((p) => {
      const title = (p.title || "").toLowerCase();
      const date = (p.date || "").toLowerCase();
      const notes = (p.notes || "").toLowerCase();
      const medicines = Array.isArray(p.medicines) ? p.medicines : [];

      const medicineMatch = medicines.some((m) => {
        const name = (m.name || "").toLowerCase();
        const dose = (m.dose || "").toLowerCase();
        return name.includes(term) || dose.includes(term);
      });

      return (
        title.includes(term) ||
        date.includes(term) ||
        notes.includes(term) ||
        medicineMatch
      );
    });
  }, [searchTerm, items]);

  function handleDownload(prescription) {
    const lines = [
      prescription.title,
      `Date: ${prescription.date}`,
      "",
      "Medicines:",
      ...(prescription.medicines || []).map(
        (m) => `- ${m.name || "Unknown"} — ${m.dose || ""}`
      ),
      "",
      "Notes:",
      prescription.notes || "",
    ];
    downloadTextAsPdf(`${prescription.id}.pdf`, prescription.title, lines);
  }

  function handleShare(prescription) {
    const text = `${prescription.title}\nDate: ${
      prescription.date
    }\nMedicines:\n${(prescription.medicines || [])
      .map((m) => `${m.name || "Unknown"} — ${m.dose || ""}`)
      .join("\n")}\n\nNotes: ${prescription.notes || ""}`;
    const dummyUrl = window.location.href;
    if (navigator.share) {
      navigator.share({ title: prescription.title, text, url: dummyUrl });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-semibold flex items-center gap-2"
            style={{ color: accentColor }}
          >
            <Pill /> My Prescriptions
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Download or share your prescriptions securely.
          </p>
        </div>
      </header>

      <div
        className="relative w-full sm:max-w-sm"
        style={{
          color: darkMode ? "#E2E8F0" : "#1E293B",
        }}
      >
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search prescriptions, medicines, or notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none transition
            ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-gray-100 placeholder-gray-400 focus:ring-1 focus:ring-[var(--accent)]"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-1 focus:ring-[var(--accent)]"
            }`}
          style={{ "--accent": accentColor }}
        />
      </div>

      <div className="grid gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((p) => (
            <article
              key={p.id}
              className="rounded-lg border bg-white p-4 shadow-sm 
                dark:bg-slate-900 dark:border-slate-800 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {p.title || "Untitled Prescription"}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Issued: {p.date || "—"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleShare(p)}
                    className="flex items-center gap-1 px-3 py-1 text-sm rounded-md border 
                      bg-gray-100 hover:bg-gray-200 
                      dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 
                      transition"
                    style={{ color: accentColor, borderColor: accentColor }}
                  >
                    <Share2 size={14} /> Share
                  </button>

                  <button
                    onClick={() => handleDownload(p)}
                    className="flex items-center gap-1 px-3 py-1 text-sm rounded-md border 
                      bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20
                      dark:bg-[var(--accent)]/20 dark:hover:bg-[var(--accent)]/30
                      transition"
                    style={{
                      borderColor: accentColor,
                      color: accentColor,
                      "--accent": accentColor,
                    }}
                  >
                    <Download size={14} /> Download
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <h4 className="font-medium text-gray-800 dark:text-gray-100">
                  Medicines
                </h4>
                <ul className="mt-2 space-y-1 text-sm">
                  {(p.medicines || []).map((m, i) => (
                    <li key={i} className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-200">
                        {m.name || "Unnamed"}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {m.dose || ""}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Notes: {p.notes || "—"}
                </p>
              </div>
            </article>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No prescriptions found.
          </p>
        )}
      </div>
    </div>
  );
}
