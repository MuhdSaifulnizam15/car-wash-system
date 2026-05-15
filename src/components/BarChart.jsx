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

const BarChart = ({ labels = [], dataList = [] }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 50,
          usePointStyle: true,
          pointStyle: "line",
        },
      },
      title: {
        display: true,
        text: "Total Sales",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    // scales: {
    //   x: {
    //     title: {
    //       display: true,
    //       text: "Date",
    //       // color: "red",
    //       // font: {
    //       //   size: 24,
    //       //   weight: "bold"
    //       // }
    //     }
    //   },
    //   y: {
    //     title: {
    //       display: true,
    //       text: "Sales",
    //       // color: "green",
    //       // font: {
    //       //   size: 18,
    //       //   weight: "bold"
    //       // }
    //     }
    //   }
    // }
  };

  // const labels = ["26/1", "27/1", "28/1", "29/1", "30/1", "31/1"];

  const data = {
    labels,
    datasets: [
      {
        label: "Daily Sales",
        data: dataList,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        xAxesID: "xAxes",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;
