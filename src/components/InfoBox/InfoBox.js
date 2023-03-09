import React from "react";
import "./style.css";

const InfoBox = ({ children }) => {
  return (
    <div className="info-box-wrapper">
      <div className="info-box">{children}</div>
    </div>
  );
};

export default InfoBox;
