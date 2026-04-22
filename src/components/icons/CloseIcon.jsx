import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const CloseIcon = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7"
      style={{
        color: theme === "dark" ? "#e5e7eb" : "#404040",
      }}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};

export default CloseIcon;
