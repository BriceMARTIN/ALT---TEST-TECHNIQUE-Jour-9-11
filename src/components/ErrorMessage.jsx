import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({ message, setRetry }) => {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      <p className="text-sm">{message}</p>
      <button
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => setRetry((prev) => !prev)}
      >
        Retry
      </button>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  setRetry: PropTypes.func.isRequired,
};

export default ErrorMessage;
