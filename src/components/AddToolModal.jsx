import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { ThemeContext } from "../context/ThemeContext";
import { createTool } from "../api/ToolsApi";

const AddToolModal = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    vendor: "",
    category: "",
    monthly_cost: "",
    website_url: "",
    status: "",
    owner_department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTool(formData);
      setFormData({
        name: "",
        description: "",
        vendor: "",
        category: "",
        monthly_cost: "",
        website_url: "",
        status: "",
        owner_department: "",
      });
      onClose();
    } catch (error) {
      console.error("Error creating tool:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="absolute inset-0" onClick={onClose} />
      <div
        className={`
        relative
        p-4 w-full max-w-md mx-4
        ${theme === "dark" ? "bg-neutral-950" : "bg-white"}
        border ${theme === "dark" ? "border-neutral-700" : "border-neutral-300"} rounded-2xl
      `}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold">Add New Tool</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon
              className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7"
              style={{ color: theme === "dark" ? "#e5e7eb" : "#404040" }}
            />
          </button>
        </div>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-1 rounded-md border ${
                theme === "dark"
                  ? "bg-neutral-900 border-neutral-700 text-white"
                  : "bg-white border-neutral-300 text-black"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-3 py-1 rounded-md border ${
                theme === "dark"
                  ? "bg-neutral-900 border-neutral-700 text-white"
                  : "bg-white border-neutral-300 text-black"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Vendor</label>
            <input
              type="text"
              name="vendor"
              value={formData.vendor}
              onChange={handleChange}
              className={`w-full px-3 py-1 rounded-md border ${
                theme === "dark"
                  ? "bg-neutral-900 border-neutral-700 text-white"
                  : "bg-white border-neutral-300 text-black"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-3 py-1 rounded-md border ${
                theme === "dark"
                  ? "bg-neutral-900 border-neutral-700 text-white"
                  : "bg-white border-neutral-300 text-black"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">
              Monthly Cost (€)
            </label>
            <input
              type="number"
              name="monthly_cost"
              value={formData.monthly_cost}
              onChange={handleChange}
              className={`w-full px-3 py-1 rounded-md border ${
                theme === "dark"
                  ? "bg-neutral-900 border-neutral-700 text-white"
                  : "bg-white border-neutral-300 text-black"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">
              Website URL
            </label>
            <input
              type="url"
              name="website_url"
              value={formData.website_url}
              onChange={handleChange}
              className={`w-full px-3 py-1 rounded-md border ${
                theme === "dark"
                  ? "bg-neutral-900 border-neutral-700 text-white"
                  : "bg-white border-neutral-300 text-black"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full px-3 py-1 rounded-md border text-sm ${
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
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">
              Owner Department
            </label>
            <input
              type="text"
              name="owner_department"
              value={formData.owner_department}
              onChange={handleChange}
              className={`w-full px-3 py-1 rounded-md border ${
                theme === "dark"
                  ? "bg-neutral-900 border-neutral-700 text-white"
                  : "bg-white border-neutral-300 text-black"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </form>
        <button
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 mt-4 px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium text-sm"
        >
          Add Tool
        </button>
      </div>
    </div>
  );
};

AddToolModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddToolModal;
