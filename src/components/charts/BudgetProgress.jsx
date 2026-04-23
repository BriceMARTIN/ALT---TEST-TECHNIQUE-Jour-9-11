import React from "react";
import PropTypes from "prop-types";

const BudgetProgress = ({ data }) => {
  return <></>;
};

BudgetProgress.propTypes = {
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

export default BudgetProgress;
