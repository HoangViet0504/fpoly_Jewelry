import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [
    "Diamond Rings",
    "Gold Necklaces",
    "Pearl Earrings",
    "Silver Bracelets",
    "Gemstone Pendants",
  ],
  datasets: [
    {
      label: "Sales",
      data: [300, 250, 200, 150, 100],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const BestSellingChart = () => {
  return (
    <div className="w-full h-[400px] p-4 flex justify-center ">
      <div>
        <h2 className="text-xl  font-semibold mb-4 ">Best Selling Products</h2>
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default BestSellingChart;
