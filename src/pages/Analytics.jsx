import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { fetchAnalytics } from "../api/AnalyticsApi";
import MonthlySpend from "../components/charts/MonthlySpend";
import DepartmentCost from "../components/charts/DepartmentCost";
import TopExpensiveTools from "../components/charts/TopExpensiveTools";
import BudgetProgress from "../components/charts/BudgetProgress";
import { CircleLoader } from "react-spinners";
import ErrorMessage from "../components/ErrorMessage";
import { toast } from "react-toastify";

const Analytics = () => {
  const { theme } = useContext(ThemeContext);

  const [analytics, setAnalytics] = useState(null);
  const [activeTab, setActiveTab] = useState("Monthly Spend");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const data = await fetchAnalytics();
        setAnalytics(data);
        setLoading(false);
        setError(null); // Clear any previous errors on successful fetch
      } catch (error) {
        toast.error("Error fetching analytics:", error.message);
        setLoading(false);
        setError(error.message);
      }
    };
    getAnalytics();
  }, [retry]);

  useEffect(() => {
    console.log(analytics);
  }, [analytics]);

  const grayTextColor =
    theme === "dark" ? "text-neutral-400" : "text-neutral-500";

  const renderChart = () => {
    if (error) {
      return <ErrorMessage message={error} setRetry={setRetry} />;
    }
    if (!analytics) return null;
    switch (activeTab) {
      case "Monthly Spend":
        return <MonthlySpend data={analytics} />;

      case "Department Cost":
        return <DepartmentCost data={analytics} />;

      case "Top Expensive Tools":
        return <TopExpensiveTools data={analytics} />;

      case "Budget Progress":
        return <BudgetProgress data={analytics} />;

      default:
        return <></>;
    }
  };

  return (
    <div className="p-8">
      <h1
        className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-black"}`}
      >
        Analytics
      </h1>
      <p
        className={`text-[10px] sm:text-xs md:text-sm lg:text-md ${grayTextColor}`}
      >
        View the analytic data through charts
      </p>
      <div className="flex gap-2 my-5">
        {[
          "Monthly Spend",
          "Department Cost",
          "Top Expensive Tools",
          "Budget Progress",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-4 py-2 text-sm rounded-lg transition-colors
              ${
                activeTab === tab
                  ? `${theme === "dark" ? "bg-neutral-800 text-neutral-100" : "bg-white text-neutral-900"} font-medium shadow-md`
                  : `bg-transparent text-neutral-500 ${theme === "dark" ? "hover:text-neutral-300" : "hover:text-neutral-700"}`
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>
      {loading && (
        <CircleLoader
          color={theme === "dark" ? "#e5e7eb" : "#404040"}
          // Always true because the loading state is already managed by our logic
          loading={true}
        />
      )}
      {renderChart()}
    </div>
  );
};

export default Analytics;
