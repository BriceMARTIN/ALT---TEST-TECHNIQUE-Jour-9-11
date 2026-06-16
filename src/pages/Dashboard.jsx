import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { TabContext } from "../context/TabContext";
import StatCard from "../components/StatCard";
import ArrowTrendingUpIcon from "@heroicons/react/24/solid/ArrowTrendingUpIcon";
import WrenchIcon from "@heroicons/react/24/solid/WrenchIcon";
import BuildingOffice2Icon from "../components/icons/BuildingOffice2Icon";
import UserGroupIcon from "@heroicons/react/24/solid/UserGroupIcon";
import ToolsTable from "../components/ToolsTable";
import { filterToolsByName } from "../utils";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const { searchQuery } = useContext(TabContext);

  // Placeholder data for now
  const tools = [
    {
      name: "Slack",
      emoji: "💬",
      department: "Communication",
      users: 245,
      monthlyCost: 2450,
      status: "Active",
    },
    {
      name: "Figma",
      emoji: "🎨",
      department: "Design",
      users: 32,
      monthlyCost: 480,
      status: "Active",
    },
    {
      name: "GitHub",
      emoji: "⚡",
      department: "Engineering",
      users: 89,
      monthlyCost: 890,
      status: "Active",
    },
    {
      name: "Notion",
      emoji: "📋",
      department: "Operations",
      users: 156,
      monthlyCost: 780,
      status: "Expiring",
    },
    {
      name: "Adobe CC",
      emoji: "🎭",
      department: "Marketing",
      users: 12,
      monthlyCost: 720,
      status: "Unused",
    },
    {
      name: "Zoom",
      emoji: "📹",
      department: "Communication",
      users: 198,
      monthlyCost: 1980,
      status: "Active",
    },
    {
      name: "Jira",
      emoji: "🔧",
      department: "Engineering",
      users: 67,
      monthlyCost: 670,
      status: "Expiring",
    },
    {
      name: "Salesforce",
      emoji: "💼",
      department: "Sales",
      users: 45,
      monthlyCost: 4500,
      status: "Active",
    },
  ];
  const [filteredTools, setFilteredTools] = useState(tools);

  const grayTextColor =
    theme === "dark" ? "text-neutral-400" : "text-neutral-500";

  useEffect(() => {
    setFilteredTools(filterToolsByName(tools, searchQuery));
  }, [searchQuery]);

  return (
    <div className="p-8">
      <h1
        className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-black"}`}
      >
        Internal Tools Dashboard
      </h1>
      <p
        className={`text-[10px] sm:text-xs md:text-sm lg:text-md ${grayTextColor}`}
      >
        Monitor and manage your organization's software tools and expenses
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
        <StatCard
          title="Monthly Budget"
          value="€28,750/€30k"
          evolution="+12%"
          gradientColor1="emerald-500"
          gradientColor2="teal-600"
          icon={
            <ArrowTrendingUpIcon
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5"
              color="white"
            />
          }
        />
        <StatCard
          title="Active Tools"
          value="147"
          evolution="+8"
          gradientColor1="indigo-500"
          gradientColor2="purple-600"
          icon={
            <WrenchIcon
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5"
              color="white"
            />
          }
        />
        <StatCard
          title="Departments"
          value="8"
          evolution="+2"
          gradientColor1="orange-500"
          gradientColor2="pink-600"
          icon={
            <BuildingOffice2Icon
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5"
              color="white"
            />
          }
        />
        <StatCard
          title="Cost/User"
          value="€156"
          evolution="-€12"
          gradientColor1="pink-500"
          gradientColor2="rose-600"
          icon={
            <UserGroupIcon
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5"
              color="white"
            />
          }
        />
      </div>
      <ToolsTable tools={filteredTools} />
    </div>
  );
};

export default Dashboard;
