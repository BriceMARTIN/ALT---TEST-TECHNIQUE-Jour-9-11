import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { ThemeContext } from "../context/ThemeContext";
import { updateTool } from "../api/ToolsApi";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const ToolDetailsModal = ({
  isOpen,
  onClose,
  tool,
  initialEditMode = false,
}) => {
  const { theme } = useContext(ThemeContext);
  const [isEditMode, setIsEditMode] = useState(initialEditMode);
  const [editData, setEditData] = useState(tool || {});

  useEffect(() => {
    setIsEditMode(initialEditMode);
  }, [initialEditMode]);

  if (!isOpen) return null;

  const editableFields = [
    "name",
    "description",
    "vendor",
    "category",
    "monthly_cost",
    "website_url",
    "status",
    "owner_department",
  ];

  const handleClose = () => {
    setIsEditMode(false);
    setEditData(tool || {});
    onClose();
  };

  const handleEditMode = () => {
    setEditData(tool);
    setIsEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateTool(tool.id, editData);
      setIsEditMode(false);
    } catch (error) {
      toast.error("Error updating tool:", error.message);
    }
  };

  const valueTitles = {
    id: "ID",
    name: "Name",
    description: "Description",
    vendor: "Vendor",
    category: "Category",
    monthly_cost: "Monthly cost",
    previous_month_cost: "Previous month's cost",
    owner_department: "Owner department",
    status: "Status",
    website_url: "Website URL",
    active_users_count: "Users",
    created_at: "Created:",
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="absolute inset-0" onClick={handleClose} />
      <div
        className={`
        relative
        p-6 w-full max-w-md mx-4
        ${theme === "dark" ? "bg-neutral-950" : "bg-white"}
        border ${theme === "dark" ? "border-neutral-700" : "border-neutral-300"} rounded-2xl
      `}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Tool Details</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon
              className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7"
              style={{ color: theme === "dark" ? "#e5e7eb" : "#404040" }}
            />
          </button>
        </div>
        <table className="table-fixed w-full">
          <tbody className="divide-y divide-neutral-800">
            {Object.entries(valueTitles).map(([key, value]) =>
              (isEditMode ? editData?.[key] : tool?.[key]) ? (
                <tr key={key}>
                  <th className="px-4 py-2 text-left font-semibold w-32 text-[10px] sm:text-xs md:text-sm lg:text-md">
                    {value}
                  </th>
                  <td className="px-4 py-2 text-[10px] sm:text-xs md:text-sm lg:text-md">
                    {isEditMode && editableFields.includes(key) ? (
                      key === "status" ? (
                        <select
                          name={key}
                          value={editData[key] || ""}
                          onChange={handleChange}
                          className={`w-full px-2 py-1 rounded-md border text-sm ${
                            theme === "dark"
                              ? "bg-neutral-900 border-neutral-700 text-white"
                              : "bg-white border-neutral-300 text-black"
                          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="">Select status</option>
                          <option value="active">Active</option>
                          <option value="expiring">Expiring</option>
                          <option value="unused">Unused</option>
                        </select>
                      ) : (
                        <input
                          type={
                            key === "monthly_cost"
                              ? "number"
                              : key === "website_url"
                                ? "url"
                                : "text"
                          }
                          name={key}
                          value={editData[key] || ""}
                          onChange={handleChange}
                          className={`w-full px-2 py-1 rounded-md border text-sm ${
                            theme === "dark"
                              ? "bg-neutral-900 border-neutral-700 text-white"
                              : "bg-white border-neutral-300 text-black"
                          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                      )
                    ) : (
                      <span className="text-neutral-400">
                        {key === "created_at"
                          ? dayjs(tool[key]).format("DD/MM/YYYY HH:mm")
                          : key === "monthly_cost" ||
                              key === "previous_month_cost"
                            ? `€${tool[key]}`
                            : tool[key]}
                      </span>
                    )}
                  </td>
                </tr>
              ) : (
                ""
              ),
            )}
          </tbody>
        </table>
        <div className="mt-4">
          {isEditMode ? (
            <button
              onClick={handleSave}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditMode}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

ToolDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialEditMode: PropTypes.bool,
  tool: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    vendor: PropTypes.string,
    category: PropTypes.string,
    monthly_cost: PropTypes.number,
    previous_month_cost: PropTypes.number,
    owner_department: PropTypes.string,
    status: PropTypes.string,
    website_url: PropTypes.string,
    active_users_count: PropTypes.number,
    icon_url: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
};

export default ToolDetailsModal;
