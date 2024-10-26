import React from "react";
import { Tabs as MuiTabs, Tab } from "@mui/material";
import { TabTypes } from "@api/types/marketDetail.types";

import "@styles/marketDetail/market-tabs.scss";
import { useTheme } from "@theme/ThemeContext";

interface MarketTabsProps {
  activeTab: TabTypes;
  onTabChange: (tab: TabTypes) => void;
}

const MarketTabs: React.FC<MarketTabsProps> = ({ activeTab, onTabChange }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: TabTypes) => {
    onTabChange(newValue);
  };
  const { theme } = useTheme();

  return (
    <MuiTabs
      value={activeTab}
      onChange={handleChange}
      className="market-tabs"
      sx={{
        backgroundColor: theme === "dark" ? "4EF09D" : "#fff",
        justifyContent: "center",
        "& .MuiTabs-indicator": {
          backgroundColor: "#4EF09D",
        },
      }}
    >
      <Tab
        label="معامله"
        value={TabTypes.TRADE}
        sx={{
          color: activeTab === TabTypes.TRADE ? "#4EF09D" : "white",
          fontFamily: "iranYekanL",
          fontSize: "1rem",
        }}
      />
      <Tab
        label="فروش"
        value={TabTypes.SELL}
        sx={{
          color: activeTab === TabTypes.SELL ? "#4EF09D" : "white",
          fontFamily: "iranYekanL",
          fontSize: "1rem",
        }}
      />
      <Tab
        label="خرید"
        value={TabTypes.BUY}
        sx={{
          color: activeTab === TabTypes.BUY ? "#4EF09D" : "white",
          fontFamily: "iranYekanL",
          fontSize: "1rem",
        }}
      />
    </MuiTabs>
  );
};

export default MarketTabs;
