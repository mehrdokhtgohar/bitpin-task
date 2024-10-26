import React from "react";
import { TabTypes } from "@api/types/markets.types";
import { Tabs as MuiTabs, Tab } from "@mui/material";
import { useTheme } from "@theme/ThemeContext";

interface TabsProps {
  activeTab: TabTypes;
  onTabChange: (tab: TabTypes) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: TabTypes) => {
    onTabChange(newValue);
  };
  const { theme } = useTheme();

  return (
    <MuiTabs
      value={activeTab}
      className="tabs"
      onChange={handleChange}
      centered
      sx={{
        backgroundColor: theme === "dark" ? "4EF09D" : "#fff",
        "& .MuiTabs-indicator": {
          backgroundColor: "#4EF09D",
        },
      }}
    >
      <Tab
        label="پایه تتر"
        value={TabTypes.USDT}
        sx={{
          color: activeTab === TabTypes.USDT ? "primary.main" : "text.primary",
          fontFamily: "iranYekanL",
          fontSize: ".8rem",
        }}
      />
      <Tab
        label="پایه تومان"
        value={TabTypes.IRT}
        sx={{
          color: activeTab === TabTypes.IRT ? "white" : "text.primary",
          fontFamily: "iranYekanL",
          fontSize: ".8rem",
        }}
      />
    </MuiTabs>
  );
};

export default Tabs;
