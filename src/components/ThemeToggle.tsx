import React from "react";
import "../styles/marketList/theme-toggle.scss";
import Switch from "./Switch";
import { useTheme } from "@theme/ThemeContext";

interface ThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  const { theme: appTheme } = useTheme();
  const themeStyles = {
    backgroundColor: appTheme === "dark" ? "#1a1a1a" : "#fff",
    color: appTheme === "dark" ? "#fff" : "#000",
  };
  return (
    <div className="theme-toggle" style={themeStyles}>
      <span>حالت {theme === "light" ? "تاریک" : "روشن"}</span>
      <Switch isOn={theme === "dark"} handleToggle={toggleTheme} />
    </div>
  );
};

export default ThemeToggle;
