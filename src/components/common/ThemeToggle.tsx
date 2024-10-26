import React from "react";
import "@styles/marketList/theme-toggle.scss";
import Switch from "./Switch";
import { THEMES, useTheme } from "@theme/ThemeContext";
import { darkTheme, lightTheme } from "@theme/theme";

interface ThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  const { theme: appTheme } = useTheme();

  return (
    <div
      className="theme-toggle"
      style={appTheme === THEMES.DARK ? darkTheme : lightTheme}
    >
      <span>حالت {theme === THEMES.LIGHT ? "تاریک" : "روشن"}</span>
      <Switch isOn={theme === THEMES.DARK} handleToggle={toggleTheme} />
    </div>
  );
};

export default ThemeToggle;
