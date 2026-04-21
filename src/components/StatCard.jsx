import React from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "../context/ThemeContext";

const colorMap = {
  "emerald-500": "#10b981",
  "teal-600": "#0d9488",
  "indigo-500": "#6366f1",
  "purple-600": "#9333ea",
  "orange-500": "#f97316",
  "pink-600": "#db2777",
  "pink-500": "#ec4899",
  "rose-600": "#e11d48",
};

const StatCard = ({
  title,
  value,
  evolution,
  icon,
  gradientColor1,
  gradientColor2,
}) => {
  const { theme } = React.useContext(ThemeContext);

  const gradientStyle =
    gradientColor1 && gradientColor2
      ? {
          background: `linear-gradient(to right, ${colorMap[gradientColor1]}, ${colorMap[gradientColor2]})`,
        }
      : {};

  return (
    <div
      className={`
        flex-1 p-4
        ${theme === "dark" ? "bg-neutral-950" : "bg-white"}
        border ${theme === "dark" ? "border-neutral-700" : "border-neutral-300"}
        rounded-2xl shadow-md
        transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer
      `}
    >
      <div className="flex flex-row items-center">
        <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-md text-neutral-500">
          {title}
        </h3>
        {icon && (
          <div className="ml-auto p-2 rounded-xl" style={gradientStyle}>
            {icon}
          </div>
        )}
      </div>
      <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold mt-3">
        {value}
      </h2>
      {evolution && (
        <p
          className="inline-block text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs mt-1 rounded-xl px-2 py-1 text-white"
          style={gradientStyle}
        >
          {evolution}
        </p>
      )}
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  evolution: PropTypes.string,
  icon: PropTypes.element,
  gradientColor1: PropTypes.string,
  gradientColor2: PropTypes.string,
};

export default StatCard;
