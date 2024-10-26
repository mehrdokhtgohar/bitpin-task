import React from "react";
import "@styles/marketList/switch.scss";

interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}

const Switch: React.FC<SwitchProps> = ({ isOn, handleToggle }) => {
  return (
    <div className="switch" onClick={handleToggle}>
      <div className={`switch-toggle ${isOn ? "on" : "off"}`}></div>
    </div>
  );
};

export default Switch;
