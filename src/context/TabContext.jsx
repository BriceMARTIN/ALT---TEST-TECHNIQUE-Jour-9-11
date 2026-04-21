import React, { createContext, useState } from "react";

const TabContext = createContext();

const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, searchQuery, setSearchQuery }}>
      {children}
    </TabContext.Provider>
  );
};

export { TabContext, TabProvider };
