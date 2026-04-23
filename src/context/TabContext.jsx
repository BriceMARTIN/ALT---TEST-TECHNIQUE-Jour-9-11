import React, { createContext, useState } from "react";

const TabContext = createContext();

const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(
    window.location.pathname.substring(1),
  );
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <TabContext.Provider
      value={{ activeTab, setActiveTab, searchQuery, setSearchQuery }}
    >
      {children}
    </TabContext.Provider>
  );
};

export { TabContext, TabProvider };
