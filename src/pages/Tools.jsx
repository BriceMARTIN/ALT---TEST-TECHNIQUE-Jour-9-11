import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { TabContext } from "../context/TabContext";
import { fetchTools } from "../api/ToolsApi";
import ToolsTable from "../components/ToolsTable";

const Tools = () => {
  const { theme } = useContext(ThemeContext);
  const { searchQuery } = useContext(TabContext);

  const [tools, setTools] = useState([]);

  useEffect(() => {
    const getTools = async () => {
      try {
        const data = await fetchTools();
        setTools(data);
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    };
    getTools();
  }, []);

  useEffect(() => {
    console.log(tools);
  }, [tools]);

  const grayTextColor =
    theme === "dark" ? "text-neutral-400" : "text-neutral-500";

  return (
    <div className="p-8">
      <h1
        className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-black"}`}
      >
        Tools
      </h1>
      <p
        className={`text-[10px] sm:text-xs md:text-sm lg:text-md ${grayTextColor}`}
      >
        Monitor and manage all the tools used by your organization
      </p>
      <ToolsTable tools={tools} withClickableDetails />
    </div>
  );
};

export default Tools;
