import React from "react";

import "@styles/marketList/header.scss";

import searchIcon from "@assets/icons/search.svg";
import chartIcon from "@assets/icons/chart.svg";
import { useTheme } from "@theme/ThemeContext";

const Header = () => {
  const { theme } = useTheme();
  const themeStyles = {
    backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
  };
  return (
    <div className="header" style={themeStyles}>
      <div className="header-wrapper">
        <div
          className="input-container"
          style={{ backgroundColor: theme === "dark" ? "#222222" : "#fff" }}
        >
          <img src={searchIcon} />
          <input
            type="text"
            placeholder="نام ارز دیجیتال را جستجو کنید"
            style={{ backgroundColor: theme === "dark" ? "#222222" : "#fff" }}
          />
        </div>
        <div className="diagrams-btn" style={themeStyles}>
          <img src={chartIcon} />
          <p>کاوشگر</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
