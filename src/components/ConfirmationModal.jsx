import React, { useContext } from "react";
import PropTypes from "prop-types";
import CloseIcon from "./icons/CloseIcon";
import { ThemeContext } from "../context/ThemeContext";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  const { theme } = useContext(ThemeContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="absolute inset-0" onClick={onClose} />
      <div
        className={`
        relative
        p-6 w-full max-w-sm mx-4
        ${theme === "dark" ? "bg-neutral-950" : "bg-white"}
        border ${theme === "dark" ? "border-neutral-700" : "border-neutral-300"} rounded-2xl
      `}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <CloseIcon />
          </button>
        </div>
        <p
          className={`mb-6 ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}
        >
          {message}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-neutral-500 text-white rounded-md hover:bg-neutral-600 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 font-medium"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ConfirmationModal;
