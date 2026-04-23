import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

const MonthlySpend = ({ data }) => {
  const constructedData = {
    labels: ["Last month", "This month"],
    datasets: [
      {
        label: "Monthly Spend",
        data: [
          data.budget_overview.previous_month_total,
          data.budget_overview.current_month_total,
        ],
        backgroundColor: "red",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } },
  };

  return <Line data={constructedData} options={options} />;
};

MonthlySpend.propTypes = {
  budget_overview: PropTypes.shape({
    budget_utilization: PropTypes.string.isRequired,
    current_month_total: PropTypes.number.isRequired,
    monthly_limit: PropTypes.number.isRequired,
    previous_month_total: PropTypes.number.isRequired,
    trend_percentage: PropTypes.string.isRequired,
  }).isRequired,
  cost_analytics: PropTypes.shape({
    active_users: PropTypes.number.isRequired,
    cost_per_user: PropTypes.number.isRequired,
    previous_cost_per_user: PropTypes.number.isRequired,
    total_users: PropTypes.number.isRequired,
  }).isRequired,
  kpi_trends: PropTypes.shape({
    budget_change: PropTypes.string.isRequired,
    cost_per_user_change: PropTypes.string.isRequired,
    departments_change: PropTypes.string.isRequired,
    tools_change: PropTypes.string.isRequired,
  }).isRequired,
};

export default MonthlySpend;
