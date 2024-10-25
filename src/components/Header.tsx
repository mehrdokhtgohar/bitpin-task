import React from "react";

import "../styles/marketList/header.scss";

import searchIcon from "../assets/icons/search.svg";
import chartIcon from "../assets/icons/chart.svg";

const Header = () => {
  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="input-container">
          <img src={searchIcon} />
          <input type="text" placeholder="نام ارز دیجیتال را جستجو کنید" />
        </div>
        <div className="diagrams-btn">
          <img src={chartIcon} />
          <p>کاوشگر</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
