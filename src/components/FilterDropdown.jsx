// FilterDropdown.jsx
import { useState, useRef, useEffect } from "react";
import DropdownIcon from "./icons/DropdownIcon";

const FilterDropdown = ({ label, options, value, onChange, theme }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isDark = theme === "dark";

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`
          flex items-center gap-1 text-[10px] sm:text-xs md:text-sm font-normal
          text-neutral-400 transition-colors duration-200
          ${isDark ? "hover:text-white" : "hover:text-black"}
        `}
      >
        {value || label}
        <DropdownIcon classes="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
      </button>

      {open && (
        <ul
          className={`
            absolute left-0 top-full mt-1 z-50 min-w-[140px] rounded-lg shadow-lg
            text-[10px] sm:text-xs md:text-sm overflow-hidden
            ${isDark ? "bg-neutral-900 border border-neutral-700" : "bg-white border border-neutral-200"}
          `}
        >
          {/* "All" option to clear the filter */}
          <li
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className={`
              px-3 py-2 cursor-pointer transition-colors duration-150
              ${!value ? "text-white font-medium" : "text-neutral-400"}
              ${isDark ? "hover:bg-neutral-800" : "hover:bg-neutral-100"}
            `}
          >
            All
          </li>
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`
                px-3 py-2 cursor-pointer transition-colors duration-150
                ${value === opt ? "text-white font-medium" : "text-neutral-400"}
                ${isDark ? "hover:bg-neutral-800" : "hover:bg-neutral-100"}
              `}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
