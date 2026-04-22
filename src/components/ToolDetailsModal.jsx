import React, { useContext } from "react";
import PropTypes from "prop-types";
import CloseIcon from "./icons/CloseIcon";
import { ThemeContext } from "../context/ThemeContext";
import dayjs from "dayjs";

const ToolDetailsModal = ({ isOpen, onClose, tool }) => {
  const { theme } = useContext(ThemeContext);

  if (!isOpen) return null;

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
    updated_at: "Last updated:",
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="absolute inset-0" onClick={onClose} />
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
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <CloseIcon />
          </button>
        </div>
        <table className="table-fixed w-full">
          <tbody className="divide-y divide-neutral-800">
            {Object.entries(valueTitles).map(([key, value]) =>
              tool?.[key] ? (
                <tr>
                  <th className="px-4 py-2 text-left font-semibold w-32 text-[10px] sm:text-xs md:text-sm lg:text-md">
                    {value}
                  </th>
                  <td className="px-4 py-2 text-neutral-400 text-[10px] sm:text-xs md:text-sm lg:text-md">
                    {["created_at", "updated_at"].includes(key)
                      ? dayjs(tool[key]).format("DD/MM/YYYY HH:mm")
                      : ["monthly_cost", "previous_month_cost"].includes(key)
                        ? `€${tool[key]}`
                        : tool[key]}
                  </td>
                </tr>
              ) : (
                ""
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ToolDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
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
