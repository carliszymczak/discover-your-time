import React from "react";
import "./style.css";

const WidgetInfo = ({ name, title, subtitle, description, className }) => {
  return (
    <div className={"widget-info " + className}>
      <div className="widget-info-box">
        <div className="widget-info-box__circle">{name}</div>
      </div>
      <div className="widget-info-text">
        <h3>{title}</h3>
        <h4>{subtitle}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default WidgetInfo;
