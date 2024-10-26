import React from "react";

import "@styles/marketList/header.scss";

import searchIcon from "@assets/icons/search.svg";
import chartIcon from "@assets/icons/chart.svg";
import { THEMES, useTheme } from "@theme/ThemeContext";
import { darkTheme, lightTheme } from "@theme/theme";

const Header = () => {
  const { theme } = useTheme();

  return (
    <div
      className="header"
      style={theme === THEMES.DARK ? darkTheme : lightTheme}
    >
      <div className="header-wrapper">
        <div
          className="input-container"
          style={{
            backgroundColor: theme === THEMES.DARK ? "#222222" : "#fff",
          }}
        >
          <img src={searchIcon} />
          <input
            type="text"
            placeholder="نام ارز دیجیتال را جستجو کنید"
            style={{
              backgroundColor: theme === THEMES.DARK ? "#222222" : "#fff",
            }}
          />
        </div>
        <div
          className="diagrams-btn"
          style={{
            backgroundColor: theme === THEMES.DARK ? "#222222" : "#fff",
          }}
        >
          <img src={chartIcon} />
          <p>کاوشگر</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
