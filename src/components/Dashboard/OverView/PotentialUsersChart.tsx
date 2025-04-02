import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Potential Users Analysis",
    },
  },
};

const labels = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];

const data = {
  labels,
  datasets: [
    {
      label: "Potential Users by Age Group",
      data: [1200, 2500, 2100, 1800, 1100, 600],
      backgroundColor: "rgba(153, 102, 255, 0.5)",
    },
  ],
};

const PotentialUsersChart = () => {
  return (
    <div className="w-full h-[400px] p-4 ">
      <Bar options={options} data={data} />
    </div>
  );
};

export default PotentialUsersChart;
