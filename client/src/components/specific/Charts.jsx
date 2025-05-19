import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Tooltip,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Filler,
} from "chart.js";
import { getLast7Days } from "../lib/features";
import {
  Lavender_Purple,
  Light_Coral,
  orange,
  Rose,
  Royal_Purple,
} from "../../constants/color";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);
const labels = getLast7Days();
const lineChatOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const value = context.parsed.y;
          let label = 'Message'+': '+value; // Default to singular

          if (value > 1) {
            label = 'Messages'; // Use plural if value is > 1
            label += ': ' + value;
          }

          return label;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};
const LineChart = ({ value = [] }) => {
  // Calculate the total number of messages
  const totalMessages = value.reduce((sum, count) => sum + count, 0);

  const data = {
    labels,
    datasets: [
      {
        // Set the label based on the total number of messages
        label: totalMessages <= 1 ? "Message" : "Messages",
        backgroundColor: "rgb(255, 99, 132,0.2)",
        borderColor: "rgb(255, 99, 132)",
        fill: true,
        data: value,
      },
    ],
  };
  return <Line data={data} options={lineChatOptions} />;
};

const doughnutChatOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      display: true,
    },
  },
  cutout: 120,
};
const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        backgroundColor: [Light_Coral, Lavender_Purple],
        borderColor: [Rose, Royal_Purple],
        offset: 20,
        fill: true,
        data: value,
      },
    ],
  };
  return (
    <Doughnut
      data={data}
      style={{ zIndex: 10 }}
      options={doughnutChatOptions}
    />
  );
};

export { LineChart, DoughnutChart };
