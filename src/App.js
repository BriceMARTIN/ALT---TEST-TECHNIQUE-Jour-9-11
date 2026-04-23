import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import { ThemeContext } from "./context/ThemeContext";
import Tools from "./pages/Tools";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings"

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-neutral-900 text-white" : "bg-gray-100 text-black"}`}
    >
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
