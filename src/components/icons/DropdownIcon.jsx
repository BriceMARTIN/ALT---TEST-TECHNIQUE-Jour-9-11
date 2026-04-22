import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import PropTypes from "prop-types";

const DropdownIcon = ({
  color = "",
  classes = "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7",
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={classes}
      style={{
        color: color ?? (theme === "dark" ? "#e5e7eb" : "#404040"),
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

DropdownIcon.propTypes = {
  color: PropTypes.string,
  classes: PropTypes.string,
};

export default DropdownIcon;
