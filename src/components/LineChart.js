import React from "react";
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
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ labels = [], dataList = [] }) => {
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
  return <Line options={options} data={data} />;
};

export default LineChart;
