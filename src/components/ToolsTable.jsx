import React, { useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "../context/ThemeContext";
import DropdownIcon from "./icons/DropdownIcon";
import AscendingIcon from "./icons/AscendingIcon";

const ToolsTable = ({ tools }) => {
  const { theme } = useContext(ThemeContext);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortedTools = useMemo(() => {
    let sortableTools = [...tools];
    if (sortConfig.key) {
      sortableTools.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTools;
  }, [tools, sortConfig]);

  const colorMap = {
    activeGradient1: "#10b981",
    activeGradient2: "#0d9488",
    expiringGradient1: "#f59e0b",
    expiringGradient2: "#ea580c",
    unusedGradient1: "#ef4444",
    unusedGradient2: "#e11d48",
  };

  return (
    <div
      className={`
      mt-4 p-4
      ${theme === "dark" ? "bg-neutral-950" : "bg-white"}
      border ${theme === "dark" ? "border-neutral-700" : "border-neutral-300"} rounded-2xl shadow-md
      `}
    >
      <div className="mb-3">
        <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold">
          Recent Tools
        </h2>
      </div>
      <table className="table-fixed w-full">
        <thead>
          <tr className="text-left px-4 py-3">
            <th className="w-1/3 px-4 py-4 text-[10px] sm:text-xs md:text-sm lg:text-md font-normal text-neutral-400">
              Tool
            </th>
            <th className="w-1/4 px-4 py-4 text-[10px] sm:text-xs md:text-sm lg:text-md font-normal text-neutral-400">
              Department
            </th>
            <th
              className={`
                w-1/6 px-4 py-4
                text-[10px] sm:text-xs md:text-sm lg:text-md font-normal text-neutral-400
                cursor-pointer transition-colors duration-200 ${theme === "dark" ? "hover:bg-neutral-800" : "hover:bg-neutral-200"}
              `}
              onClick={() => {
                setSortConfig((prev) => ({
                  key: "users",
                  direction:
                    prev.key === "users" && prev.direction === "asc"
                      ? "desc"
                      : "asc",
                }));
              }}
            >
              <div className="flex items-center gap-1">
                Users
                {sortConfig.key === "users" &&
                  (sortConfig.direction === "asc" ? (
                    <AscendingIcon />
                  ) : (
                    <DropdownIcon
                      color="text-neutral-400"
                      classes="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
                    />
                  ))}
              </div>
            </th>
            <th
              className={`
              w-1/6 px-4 py-4
              text-[10px] sm:text-xs md:text-sm lg:text-md font-normal text-neutral-400
              cursor-pointer transition-colors duration-200 ${theme === "dark" ? "hover:bg-neutral-800" : "hover:bg-neutral-200"}
            `}
              onClick={() => {
                setSortConfig((prev) => ({
                  key: "monthlyCost",
                  direction:
                    prev.key === "monthlyCost" && prev.direction === "asc"
                      ? "desc"
                      : "asc",
                }));
              }}
            >
              <div className="flex items-center gap-1">
                Monthly Cost
                {sortConfig.key === "monthlyCost" &&
                  (sortConfig.direction === "asc" ? (
                    <AscendingIcon />
                  ) : (
                    <DropdownIcon
                      color="text-neutral-400"
                      classes="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
                    />
                  ))}
              </div>
            </th>
            <th className="w-1/6 px-4 py-4 text-[10px] sm:text-xs md:text-sm lg:text-md font-normal text-neutral-400">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {sortedTools.map((tool, key) => (
            <tr
              key={key}
              className={`cursor-pointer transition-colors duration-200 ${theme === "dark" ? "hover:bg-neutral-800" : "hover:bg-neutral-200"}`}
            >
              <td className="px-4 py-4 text-[10px] sm:text-xs md:text-sm lg:text-md">
                {tool?.emoji && <span className="mr-3">{tool.emoji}</span>}
                {tool.name}
              </td>
              <td className="px-4 py-4 text-neutral-400 text-[10px] sm:text-xs md:text-sm lg:text-md">
                {tool.department}
              </td>
              <td className="px-4 py-4 text-neutral-400 text-[10px] sm:text-xs md:text-sm lg:text-md">
                {tool.users}
              </td>
              <td className="px-4 py-4 text-neutral-400 text-[10px] sm:text-xs md:text-sm lg:text-md">
                €{tool.monthlyCost}
              </td>
              <td className="text-white px-4 py-4 text-neutral-400 text-[10px] sm:text-xs md:text-sm lg:text-md">
                {tool.status === "Active" ? (
                  <span
                    className="rounded-lg px-2 py-1 text-[8px] sm:text-[10px] md:text-xs lg:text-sm"
                    style={{
                      background: `linear-gradient(to right, ${colorMap.activeGradient1}, ${colorMap.activeGradient2})`,
                    }}
                  >
                    {tool.status}
                  </span>
                ) : tool.status === "Expiring" ? (
                  <span
                    className="rounded-lg px-2 py-1 text-[8px] sm:text-[10px] md:text-xs lg:text-sm"
                    style={{
                      background: `linear-gradient(to right, ${colorMap.expiringGradient1}, ${colorMap.expiringGradient2})`,
                    }}
                  >
                    {tool.status}
                  </span>
                ) : (
                  <span
                    className="rounded-lg px-2 py-1 text-[8px] sm:text-[10px] md:text-xs lg:text-sm"
                    style={{
                      background: `linear-gradient(to right, ${colorMap.unusedGradient1}, ${colorMap.unusedGradient2})`,
                    }}
                  >
                    {tool.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ToolsTable.propTypes = {
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      emoji: PropTypes.string,
      name: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      users: PropTypes.number.isRequired,
      monthlyCost: PropTypes.number.isRequired,
      status: PropTypes.oneOf(["Active", "Expiring", "Unused"]).isRequired,
    }),
  ).isRequired,
};

export default ToolsTable;
