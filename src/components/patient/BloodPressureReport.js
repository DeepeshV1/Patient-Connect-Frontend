// 📊 Blood Pressure Trends & Health Summary Section (Final)
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FiActivity, FiBookOpen } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const BloodPressureSection = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("Today");

  // 🗓️ Dynamic date labels
  const today = new Date();
  const getThursday = (offsetWeeks = 0) => {
    const date = new Date(today);
    const day = date.getDay();
    const diff = (day >= 4 ? day - 4 : day + 3) + offsetWeeks * 7;
    date.setDate(date.getDate() - diff);
    return date;
  };
  const lastThursday = getThursday(1);
  const prevThursday = getThursday(2);

  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });

  // 🩸 Realistic static BP data
  const dataSets = {
    Today: [
      { time: "8 AM", sys: 119, dia: 78 },
      { time: "12 PM", sys: 120, dia: 80 },
      { time: "4 PM", sys: 122, dia: 79 },
      { time: "8 PM", sys: 121, dia: 78 },
    ],
    "Last Week": [
      { day: "Mon", sys: 126, dia: 83 },
      { day: "Tue", sys: 125, dia: 82 },
      { day: "Wed", sys: 124, dia: 81 },
      { day: "Thu", sys: 123, dia: 80 },
      { day: "Fri", sys: 122, dia: 79 },
    ],
    Previous: [
      { day: "Mon", sys: 130, dia: 86 },
      { day: "Tue", sys: 129, dia: 85 },
      { day: "Wed", sys: 127, dia: 84 },
      { day: "Thu", sys: 126, dia: 83 },
      { day: "Fri", sys: 125, dia: 82 },
    ],
  };

  // 📊 Calculate improvement
  const avg = (arr, key) => arr.reduce((a, b) => a + b[key], 0) / arr.length;
  const todayAvg = avg(dataSets["Today"], "sys");
  const lastWeekAvg = avg(dataSets["Last Week"], "sys");
  const prevAvg = avg(dataSets["Previous"], "sys");

  const improvement =
    selectedTab === "Today"
      ? lastWeekAvg - todayAvg
      : selectedTab === "Last Week"
      ? prevAvg - lastWeekAvg
      : 0;

  // 🧠 Empathetic message
  const improvementMsg =
    improvement > 0
      ? `✅ Excellent consistency! Your systolic readings have improved by ${improvement.toFixed(
          1
        )} points since ${
          selectedTab === "Today" ? "last week" : "two weeks ago"
        }.`
      : improvement < 0
      ? `💡 Slight variation noted — your readings are ${Math.abs(
          improvement
        ).toFixed(
          1
        )} points higher than ${
          selectedTab === "Today" ? "last week" : "two weeks ago"
        }.`
      : `🌿 Stable and steady! Your blood pressure has maintained a balanced range.`;

  return (
    <section
      className="mt-8 transition-colors duration-300"
      style={{
        outline: "none",
      }}
    >
      <div
        className={`rounded-2xl shadow-lg p-6 border transition-colors duration-300 ${
          darkMode
            ? "bg-gray-900 border-gray-700 text-gray-100"
            : "bg-white border-gray-200 text-gray-800"
        }`}
        style={{
          outline: "none",
          boxShadow: "none",
        }}
      >
        {/* 🔖 Tabs */}
        <div className="flex justify-center mb-6 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden w-full sm:w-96 mx-auto">
          {["Today", "Last Week", "Previous"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 text-sm font-semibold py-2 transition-all duration-300 focus:outline-none focus:ring-0 focus:ring-transparent ${
                selectedTab === tab
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
              style={{
                outline: "none",
                boxShadow: "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 🩺 Graph + Summary layout (55/45) */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6 items-stretch">
          {/* 📈 Static Graph */}
          <div
            className={`rounded-xl p-4 shadow-inner transition-colors duration-300 ${
              darkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
            style={{
              outline: "none",
              boxShadow: "none",
            }}
          >
            <h4 className="text-lg font-semibold text-grey-600 dark:text-red-400 mb-3 flex items-center gap-2">
              <FiActivity className="text-red-500 dark:text-red-400" />
              Blood Pressure Overview
            </h4>

            <ResponsiveContainer width="100%" height={260}>
                
<style jsx global>{`
  .recharts-wrapper *:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`}</style>
              <LineChart
                data={dataSets[selectedTab]}
                margin={{ top: 10, right: 20, left: 25, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#374151" : "#e5e7eb"}
                />
                <XAxis
                  dataKey={selectedTab === "Today" ? "time" : "day"}
                  stroke={darkMode ? "#9ca3af" : "#6b7280"}
                  tickLine={false}
                />
                <YAxis
                  domain={[70, 135]}
                  stroke={darkMode ? "#9ca3af" : "#6b7280"}
                  tickLine={false}
                  label={{
                    value: "mmHg",
                    angle: -90,
                    position: "insideLeft",
                    offset: -5,
                    fill: darkMode ? "#9ca3af" : "#6b7280",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#1f2937" : "#f9fafb",
                    border: "1px solid",
                    borderColor: darkMode ? "#374151" : "#e5e7eb",
                    color: darkMode ? "#f3f4f6" : "#111827",
                    borderRadius: "10px",
                  }}
                />
                <Legend
                  verticalAlign="top"
                  height={30}
                  wrapperStyle={{
                    color: darkMode ? "#e5e7eb" : "#111827",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sys"
                  stroke="#ef4444"
                  strokeWidth={2.4}
                  dot={{ r: 3.5, fill: "#ef4444" }}
                  isAnimationActive={false}
                  name="Systolic"
                />
                <Line
                  type="monotone"
                  dataKey="dia"
                  stroke="#3b82f6"
                  strokeWidth={2.4}
                  dot={{ r: 3.5, fill: "#3b82f6" }}
                  isAnimationActive={false}
                  name="Diastolic"
                />
              </LineChart>
            </ResponsiveContainer>

            {/* 📅 Date labels */}
            <div className="relative pb-12 mt-1">
              <div className="absolute bottom-3 right-4 text-[11px] text-gray-500 dark:text-gray-400 text-right leading-tight space-y-0.5">
                <div>Today: {formatDate(today)}</div>
                <div>Last Week: {formatDate(lastThursday)}</div>
                <div>Previous: {formatDate(prevThursday)}</div>
              </div>

              <div className="absolute bottom-3 left-4">
                <p className="text-xs text-gray-500 dark:text-gray-600 italic">
                  {selectedTab === "Today"
                    ? "🩸 Daily live tracking"
                    : selectedTab === "Last Week"
                    ? "📈 Week-over-week comparison"
                    : "📊 Two-week historical baseline"}
                </p>
              </div>
            </div>
          </div>

          {/* 💬 Health Summary */}
          <div
            className={`rounded-xl p-5 shadow-inner flex flex-col justify-between transition-colors duration-300 ${
              darkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <h4 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
              <FiBookOpen className="text-green-600 dark:text-green-400" />
              Health Summary
            </h4>

            <ul className="text-sm text-gray-700 dark:text-gray-300 mb-4 space-y-1">
              <li>
                • Average Systolic:{" "}
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {avg(dataSets[selectedTab], "sys").toFixed(1)} mmHg
                </span>
              </li>
              <li>
                • Average Diastolic:{" "}
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {avg(dataSets[selectedTab], "dia").toFixed(1)} mmHg
                </span>
              </li>
              <li>
                • Comparison:
                <span className="ml-1">
                  {improvement > 0
                    ? "Improved ✅"
                    : improvement < 0
                    ? "Slight Rise ⚠️"
                    : "Stable 🌿"}
                </span>
              </li>
            </ul>

            <blockquote className="text-sm text-green-700 dark:text-green-300 mb-4 italic border-l-4 border-green-400 pl-3 leading-relaxed">
              {improvementMsg}
            </blockquote>

            <button
              onClick={() => navigate("/patient/lab-reports")}
              className="text-sm font-semibold px-4 py-2 rounded-lg shadow hover:shadow-lg transition-all duration-300 bg-green-600 hover:bg-green-700 text-white self-start focus:outline-none focus:ring-0 focus:ring-transparent"
              style={{
                outline: "none",
                boxShadow: "none",
              }}
            >
              View Full Report →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BloodPressureSection;
