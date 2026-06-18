import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { TabContext } from "../context/TabContext";
import { fetchTools } from "../api/ToolsApi";
import ToolsTable from "../components/ToolsTable";
import { filterToolsByName } from "../utils";
import { CircleLoader } from "react-spinners";
import ErrorMessage from "../components/ErrorMessage";
import { toast } from "react-toastify";

const Tools = () => {
  const { theme } = useContext(ThemeContext);
  const { searchQuery } = useContext(TabContext);

  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    const getTools = async () => {
      try {
        const data = await fetchTools();
        setTools(data);
        setLoading(false);
        setError(null); // Clear any previous errors on successful fetch
      } catch (error) {
        toast.error("Error fetching tools:", error.message);
        setLoading(false);
        setError(error.message || "An error occurred while fetching tools.");
      }
    };
    getTools();
  }, []);

  useEffect(() => {
    setFilteredTools(filterToolsByName(tools, searchQuery));
  }, [tools, searchQuery]);

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
      {loading && (
        <CircleLoader
          color={theme === "dark" ? "#e5e7eb" : "#404040"}
          // Always true because the loading state is already managed by our logic
          loading={true}
        />
      )}
      {error && <ErrorMessage message={error} setRetry={setRetry} />}
      <ToolsTable tools={filteredTools} withClickableDetails />
    </div>
  );
};

export default Tools;
