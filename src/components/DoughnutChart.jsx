import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ labels = [], dataList = [] }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Sales by Service",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Services",
        data: dataList,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(122, 102, 255, 0.2)",
          "rgba(198, 159, 64, 0.2)",
          "rgba(200, 54, 64, 0.2)",
          "rgba(228, 90, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(122, 102, 255, 1)",
          "rgba(198, 159, 64, 1)",
          "rgba(200, 54, 64, 1)",
          "rgba(228, 90, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} options={options} />;
};

export default DoughnutChart;
