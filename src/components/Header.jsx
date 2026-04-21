import React, { useContext } from "react";
import { TabContext } from "../context/TabContext";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import ThemeIcon from "./icons/ThemeIcon";
import NotificationsIcon from "./icons/NotificationsIcon";
import SettingsIcon from "./icons/SettingsIcon";
import DropdownIcon from "./icons/DropdownIcon";
import SearchIcon from "./icons/SearchIcon";

const Header = () => {
  const { activeTab, setActiveTab, searchQuery, setSearchQuery } =
    useContext(TabContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSwitchTab = (tab) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  const activeTabColor = theme === "dark" ? "text-white" : "text-black";
  const inactiveTabColor =
    theme === "dark" ? "text-neutral-400" : "text-neutral-500";

  return (
    <header
      className={`flex flex-col sm:flex-row justify-between p-2 sm:p-3 md:p-4 lg:p-5 ${theme === "dark" ? "bg-neutral-950" : "bg-white"}`}
    >
      <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        <>{/* TODO: Add logo */}</>
        <button
          disabled={activeTab === ""}
          onClick={() => handleSwitchTab("")}
          className={`text-xs sm:text-sm md:text-base lg:text-lg ${activeTab === "" ? activeTabColor : inactiveTabColor}`}
        >
          Dashboard
        </button>
        <button
          disabled={activeTab === "tools"}
          onClick={() => handleSwitchTab("tools")}
          className={`text-xs sm:text-sm md:text-base lg:text-lg ${activeTab === "tools" ? activeTabColor : inactiveTabColor}`}
        >
          Tools
        </button>
        <button
          disabled={activeTab === "analytics"}
          onClick={() => handleSwitchTab("analytics")}
          className={`text-xs sm:text-sm md:text-base lg:text-lg ${activeTab === "analytics" ? activeTabColor : inactiveTabColor}`}
        >
          Analytics
        </button>
        <button
          disabled={activeTab === "settings"}
          onClick={() => handleSwitchTab("settings")}
          className={`text-xs sm:text-sm md:text-base lg:text-lg ${activeTab === "settings" ? activeTabColor : inactiveTabColor}`}
        >
          Settings
        </button>
      </div>
      <div className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4">
        <div className="relative">
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            id="search-input"
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`
              text-xs sm:text-sm md:text-base lg:text-lg
              w-32 sm:w-40 md:w-48 lg:w-64
              pl-2 pr-8 py-1 sm:pl-3 sm:pr-9 sm:py-2 md:pl-4 md:pr-10 md:py-2 lg:pl-4 lg:pr-10 lg:py-3
              rounded-md border
              ${
                theme === "dark"
                  ? "bg-neutral-800 border-neutral-600 text-neutral-100 placeholder-neutral-400"
                  : "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500"
              }
            `}
          />
        </div>
        {/* Check for equality to dark rather than light as a possibly empty string (which would be falsy) defaults to light */}
        <button
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          <ThemeIcon />
        </button>
        <button>
          <NotificationsIcon />
        </button>
        <button>
          <SettingsIcon />
        </button>
        <button className="flex flex-row items-center">
          {/* User avatar placeholder */}
          <img
            src="/logo192.png"
            alt="User Avatar"
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
          />
          <DropdownIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
