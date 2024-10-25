import React from "react";
import "../styles/marketList/theme-toggle.scss";
import Switch from "./Switch";

interface ThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <div className="theme-toggle">
      <span>حالت {theme === "light" ? "تاریک" : "روشن"}</span>
      <Switch isOn={theme === "dark"} handleToggle={toggleTheme} />
    </div>
  );
};

export default ThemeToggle;
