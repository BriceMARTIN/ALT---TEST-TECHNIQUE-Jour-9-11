import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from "prop-types";

Chart.register(ArcElement, Tooltip, Legend);

const DepartmentCost = ({ data }) => {
  const constructedData = {
    labels: ["Last month", "This month"],
    datasets: [
      {
        label: "Monthly Spend",
        data: [
          data.budget_overview.previous_month_total,
          data.budget_overview.current_month_total,
        ],
        backgroundColor: ["red", "blue"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } },
  };

  return (
    <>
      <h1>
        NOTE: The required data is not provided, this pie chart's information is
        only a placeholder
      </h1>
      <Pie data={constructedData} options={options} />
    </>
  );
};

DepartmentCost.propTypes = {
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

export default DepartmentCost;
