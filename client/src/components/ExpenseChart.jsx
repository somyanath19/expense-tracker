import "./ExpenseChart.css";

import { Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ExpenseChart() {

  const data = {
    labels: ["Income", "Expense", "Savings"],
    datasets: [
      {
        data: [40000, 15000, 10000],
        backgroundColor: [
          "#22c55e",
          "#ef4444",
          "#7c3aed"
        ],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="chart-card">

      <h2>Expense Analytics</h2>

      <div className="chart-wrapper">
        <Doughnut data={data} />
      </div>

    </div>
  );
}

export default ExpenseChart;