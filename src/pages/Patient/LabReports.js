// src/pages/Patient/LabReports.js
import React, { useState, useMemo } from "react";
import {
  FlaskConical,
  Download,
  Share2,
  ChevronDown,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { downloadTextAsPdf, tryWebShare } from "../../utils/filehelpers";
import { mockDiagnosisData } from "../../data/mockData"; // use named export

export default function LabReports() {
  // ✅ pull reports from shared mock data file
  const [reports, setReports] = useState(mockDiagnosisData.labReports || []);
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortNewest, setSortNewest] = useState(true);
  const { accentColor, darkMode } = useTheme();

  // 🔍 Filtering + searching + sorting
  const filteredReports = useMemo(() => {
    let data = [...reports];
    if (filter !== "All") data = data.filter((r) => r.type === filter);
    if (search.trim())
      data = data.filter((r) =>
        r.testName.toLowerCase().includes(search.toLowerCase())
      );
    return data.sort((a, b) =>
      sortNewest
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
  }, [reports, filter, search, sortNewest]);

  const handleDownload = (r) => {
    const lines = [
      r.testName,
      `Date: ${r.date}`,
      `Doctor: ${r.doctor}`,
      "",
      `Status: ${r.status}`,
      "",
      "Notes:",
      r.notes || "No additional notes provided.",
    ];
    downloadTextAsPdf(`${r.id}.pdf`, r.testName, lines);
  };

  const handleShare = (r) => {
    const text = `${r.testName}\nDate: ${r.date}\nDoctor: ${r.doctor}\nStatus: ${r.status}\n\nNotes: ${
      r.notes || "No additional notes."
    }`;
    tryWebShare(r.testName, text);
  };

  const handleAdd = () => {
    const newReport = {
      id: `lab-${Date.now()}`,
      testName: "New Lab Report",
      date: new Date().toISOString().slice(0, 10),
      doctor: "Dr. Placeholder",
      type: "Blood",
      status: "Pending",
      notes: "Awaiting update.",
    };
    setReports((prev) => [newReport, ...prev]);
  };

  return (
    <div
      className={`space-y-6 transition-colors duration-300 ${
        darkMode ? "text-gray-100" : "text-gray-800"
      }`}
    >
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1
            className="text-2xl font-semibold flex items-center gap-2"
            style={{ color: accentColor }}
          >
            <FlaskConical /> Lab Reports
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            View, download, and manage all your lab test results securely.
          </p>
        </div>
        
      </header>

      {/* Filter + Search + Sort */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          {["All", "Blood", "Urine", "Scan", "Swab", "Cardiac"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full border text-sm transition-all duration-200 ${
                filter === f
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300 bg-transparent"
              }`}
              style={{
                backgroundColor: filter === f ? accentColor : "transparent",
                borderColor: accentColor,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-2 top-2.5 text-gray-500 dark:text-gray-300"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search report..."
              className="pl-8 pr-3 py-1.5 border rounded-md text-sm 
                bg-white dark:bg-gray-800 
                text-gray-800 dark:text-gray-100 
                border-gray-300 dark:border-gray-700 
                placeholder-gray-500 dark:placeholder-gray-400
                focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            onClick={() => setSortNewest((v) => !v)}
            className="flex items-center gap-1 text-sm border px-2 py-1.5 rounded-md 
            hover:bg-gray-50 dark:hover:bg-gray-800 transition
            text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700"
          >
            <Filter size={14} />
            {sortNewest ? "Newest" : "Oldest"}
          </button>
        </div>
      </div>

      {/* Reports */}
      <div className="grid gap-4">
        {filteredReports.map((r) => (
          <article
            key={r.id}
            className={`rounded-lg border p-4 shadow-sm transition-all duration-200 ${
              darkMode
                ? "bg-gray-900 border-gray-800 hover:bg-gray-800"
                : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{r.testName}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {r.date} • {r.doctor}
                </p>
                <span
                  className="inline-block text-sm font-medium mt-1 rounded-full px-2 py-0.5"
                  style={{
                    backgroundColor: `${accentColor}1A`,
                    color: accentColor,
                  }}
                >
                  {r.status}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleShare(r)}
                  className="flex items-center gap-1 px-3 py-1 rounded-md border hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700"
                >
                  <Share2 size={14} /> Share
                </button>
                <button
                  onClick={() => handleDownload(r)}
                  className="flex items-center gap-1 px-3 py-1 rounded-md border text-sm"
                  style={{
                    borderColor: accentColor,
                    color: accentColor,
                    backgroundColor: `${accentColor}1A`,
                  }}
                >
                  <Download size={14} /> Download
                </button>
                <button
                  onClick={() =>
                    setExpanded((prev) => (prev === r.id ? null : r.id))
                  }
                  className="px-2 py-1 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      expanded === r.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {expanded === r.id && (
              <div className="mt-4 border-t pt-3 space-y-2 text-sm border-gray-200 dark:border-gray-800">
                {r.details ? (
                  <table className="w-full text-sm">
                    <thead className="text-gray-500 dark:text-gray-400">
                      <tr>
                        <th className="text-left py-1">Test</th>
                        <th className="text-left py-1">Value</th>
                        <th className="text-left py-1">Reference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {r.details.map((d, i) => (
                        <tr
                          key={i}
                          className="border-t border-gray-100 dark:border-gray-800"
                        >
                          <td className="py-1">{d.name}</td>
                          <td className="py-1">{d.value}</td>
                          <td className="py-1 text-gray-500 dark:text-gray-400">
                            {d.range}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-400">No detailed test data found.</p>
                )}
                {r.notes && (
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    <strong>Notes:</strong> {r.notes}
                  </p>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
