import React, { useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "../context/ThemeContext";
import { deleteTool } from "../api/ToolsApi";
import DropdownIcon from "./icons/DropdownIcon";
import AscendingIcon from "./icons/AscendingIcon";
import ToolDetailsModal from "./ToolDetailsModal";
import AddToolModal from "./AddToolModal";
import ConfirmationModal from "./ConfirmationModal";
import PlusIcon from "./icons/PlusIcon";
import FilterDropdown from "./FilterDropdown";

const ToolsTable = ({ tools, withClickableDetails = false }) => {
  const { theme } = useContext(ThemeContext);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Modal related data
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [currentTool, setCurrentTool] = useState(null);
  const [addToolModalOpen, setAddToolModalOpen] = useState(false);
  const [detailsModalEditMode, setDetailsModalEditMode] = useState(false);
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  const [toolToDelete, setToolToDelete] = useState(null);

  const departmentOptions = useMemo(
    () => [
      ...new Set(
        tools
          .map(
            (t) =>
              t?.department?.toLowerCase() ??
              t?.owner_department?.toLowerCase(),
          )
          .filter((department) => !!department),
      ),
    ],
    [tools],
  );
  const statusOptions = useMemo(
    () => [
      ...new Set(
        tools.map((t) => t?.status?.toLowerCase()).filter((status) => !!status),
      ),
    ],
    [tools],
  );

  // Apply the filters first
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const dept = (
        tool?.department ??
        tool?.owner_department ??
        ""
      ).toLowerCase();
      const status = (tool?.status ?? "").toLowerCase();
      return (
        (!departmentFilter || dept === departmentFilter) &&
        (!statusFilter || status === statusFilter)
      );
    });
  }, [tools, departmentFilter, statusFilter]);

  // Sort the filtered tools
  const sortedTools = useMemo(() => {
    let sortableTools = [...filteredTools];
    if (sortConfig.key || sortConfig.altKey) {
      sortableTools.sort((a, b) => {
        if (
          (a[sortConfig.key] ?? a[sortConfig.altKey]) <
          (b[sortConfig.key] ?? b[sortConfig.altKey])
        )
          return sortConfig.direction === "asc" ? -1 : 1;
        if (
          (a[sortConfig.key] ?? a[sortConfig.altKey]) >
          (b[sortConfig.key] ?? b[sortConfig.altKey])
        )
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableTools;
  }, [filteredTools, sortConfig]);

  const colorMap = {
    activeGradient1: "#10b981",
    activeGradient2: "#0d9488",
    expiringGradient1: "#f59e0b",
    expiringGradient2: "#ea580c",
    unusedGradient1: "#ef4444",
    unusedGradient2: "#e11d48",
  };

  const handleViewTool = (tool) => {
    setCurrentTool(tool);
    setDetailsModalEditMode(false);
    setDetailsModalOpen(true);
  };

  const handleEditTool = (tool) => {
    setCurrentTool(tool);
    setDetailsModalEditMode(true);
    setDetailsModalOpen(true);
  };

  const handleDeleteClick = (tool) => {
    setToolToDelete(tool);
    setDeleteConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTool(toolToDelete.id);
      setDeleteConfirmModalOpen(false);
      setToolToDelete(null);
    } catch (error) {
      console.error("Error deleting tool:", error);
    }
  };

  return (
    <>
      <div
        className={`
      mt-4 p-4
      ${theme === "dark" ? "bg-neutral-950" : "bg-white"}
      border ${theme === "dark" ? "border-neutral-700" : "border-neutral-300"} rounded-2xl shadow-md
      `}
      >
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold">
              Recent Tools
            </h2>
            <button
              onClick={() => setAddToolModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
            >
              <PlusIcon />
              Add Tool
            </button>
          </div>
        </div>
        <table className="table-fixed w-full">
          <thead>
            <tr className="text-left px-4 py-3">
              <th className="w-1/3 px-4 py-4 text-[10px] sm:text-xs md:text-sm lg:text-md font-normal text-neutral-400">
                Tool
              </th>
              <th className="w-1/4 px-4 py-4 text-[10px] sm:text-xs md:text-sm lg:text-md font-normal text-neutral-400">
                <FilterDropdown
                  label="Department"
                  options={departmentOptions}
                  value={departmentFilter}
                  onChange={setDepartmentFilter}
                  theme={theme}
                />
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
                    altKey: "active_users_count",
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
                    altKey: "monthly_cost",
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
                <FilterDropdown
                  label="Status"
                  options={statusOptions}
                  value={statusFilter}
                  onChange={setStatusFilter}
                  theme={theme}
                />
              </th>
              <th className="w-1/6 px-4 py-4 text-[10px] sm:text-xs md:text-sm lg:text-md font-normal text-neutral-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {sortedTools.map((tool, key) => (
              <tr
                key={key}
                className={`transition-colors duration-200 ${theme === "dark" ? "hover:bg-neutral-800" : "hover:bg-neutral-200"}`}
              >
                <td className="px-4 py-4 text-[10px] sm:text-xs md:text-sm lg:text-md">
                  {tool?.emoji && <span className="mr-3">{tool.emoji}</span>}
                  {tool.name}
                </td>
                <td className="px-4 py-4 text-neutral-400 text-[10px] sm:text-xs md:text-sm lg:text-md">
                  {tool?.department ?? tool?.owner_department ?? ""}
                </td>
                <td className="px-4 py-4 text-neutral-400 text-[10px] sm:text-xs md:text-sm lg:text-md">
                  {tool?.users ?? tool?.active_users_count ?? ""}
                </td>
                <td className="px-4 py-4 text-neutral-400 text-[10px] sm:text-xs md:text-sm lg:text-md">
                  €
                  {tool?.monthlyCost
                    ? tool.monthlyCost.toString()
                    : tool?.monthly_cost
                      ? tool.monthly_cost.toString()
                      : ""}
                </td>
                <td className="text-white px-4 py-4 text-neutral-400 text-[10px] sm:text-xs md:text-sm lg:text-md">
                  {tool.status?.toLowerCase() === "active" ? (
                    <span
                      className="rounded-lg px-2 py-1 text-[8px] sm:text-[10px] md:text-xs lg:text-sm"
                      style={{
                        background: `linear-gradient(to right, ${colorMap.activeGradient1}, ${colorMap.activeGradient2})`,
                      }}
                    >
                      {tool.status}
                    </span>
                  ) : tool.status?.toLowerCase() === "expiring" ? (
                    <span
                      className="rounded-lg px-2 py-1 text-[8px] sm:text-[10px] md:text-xs lg:text-sm"
                      style={{
                        background: `linear-gradient(to right, ${colorMap.expiringGradient1}, ${colorMap.expiringGradient2})`,
                      }}
                    >
                      {tool.status}
                    </span>
                  ) : tool.status?.toLowerCase() === "unused" ? (
                    <span
                      className="rounded-lg px-2 py-1 text-[8px] sm:text-[10px] md:text-xs lg:text-sm"
                      style={{
                        background: `linear-gradient(to right, ${colorMap.unusedGradient1}, ${colorMap.unusedGradient2})`,
                      }}
                    >
                      {tool.status}
                    </span>
                  ) : (
                    ""
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewTool(tool)}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-[8px] sm:text-[10px] md:text-xs lg:text-sm hover:bg-blue-600 transition-colors duration-200"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditTool(tool)}
                      className="px-3 py-1 bg-green-500 text-white rounded text-[8px] sm:text-[10px] md:text-xs lg:text-sm hover:bg-green-600 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(tool)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-[8px] sm:text-[10px] md:text-xs lg:text-sm hover:bg-red-600 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToolDetailsModal
          isOpen={detailsModalOpen}
          onClose={() => {
            setDetailsModalOpen(false);
            setDetailsModalEditMode(false);
          }}
          tool={currentTool}
          initialEditMode={detailsModalEditMode}
        />
        <AddToolModal
          isOpen={addToolModalOpen}
          onClose={() => {
            setAddToolModalOpen(false);
          }}
        />
        <ConfirmationModal
          isOpen={deleteConfirmModalOpen}
          onClose={() => {
            setDeleteConfirmModalOpen(false);
            setToolToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          title="Delete Tool"
          message={`Are you sure you want to delete "${toolToDelete?.name}"? This action cannot be undone.`}
        />
      </div>
    </>
  );
};

ToolsTable.propTypes = {
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      emoji: PropTypes.string,
      name: PropTypes.string.isRequired,
      // Two key names for some data types to be handled in both Tools and Dashboard; bound to change to only handle the API key names down the line
      department: PropTypes.string,
      owner_department: PropTypes.string,
      users: PropTypes.number,
      active_users_count: PropTypes.number,
      monthlyCost: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      monthly_cost: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      status: PropTypes.oneOf(["Active", "Expiring", "Unused"]),
    }),
  ).isRequired,
  withClickableDetails: PropTypes.bool.isRequired,
};

export default ToolsTable;
