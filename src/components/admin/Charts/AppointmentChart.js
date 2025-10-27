// AppointmentChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AppointmentChart = () => {
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Next Mon", "Next Tue"],
    datasets: [
      {
        label: "Appointments",
        data: [30, 45, 50, 40, 60, 20, 10, 25, 35],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79,70,229,0.2)",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#4F46E5",
        pointBorderColor: "#fff",
        pointHoverRadius: 7,
      },
      {
        label: "Revenue ($)",
        data: [1200, 1500, 1700, 1300, 2000, 900, 500, 1400, 1600],
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245,158,11,0.2)",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#F59E0B",
        pointBorderColor: "#fff",
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { enabled: true },
    },
    scales: { y: { beginAtZero: true } },
  };

  return <Line data={chartData} options={chartOptions} height={150} />;
};

export default AppointmentChart;
