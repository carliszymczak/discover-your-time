import {
  faChartPie,
  faHome,
  faList,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const Menu = () => {
  const isSignedIn = localStorage.getItem("userId");

  return (
    <div className="menu">
      <NavLink
        to="/home"
        className="dot"
        style={({ isActive }) => {
          return {
            background: isActive ? "#998B8F" : "#cac4c5",
          };
        }}
      >
        <FontAwesomeIcon icon={faHome} />
      </NavLink>
      <NavLink
        to="/add-activity"
        className="dot"
        style={({ isActive }) => {
          return {
            background: isActive ? "#998B8F" : "#cac4c5",
          };
        }}
      >
        <FontAwesomeIcon icon={faList} />
      </NavLink>
      <NavLink
        to="/checkout-plan"
        className="dot"
        style={({ isActive }) => {
          return {
            background: isActive ? "#998B8F" : "#cac4c5",
          };
        }}
      >
        <FontAwesomeIcon icon={faTasks} />
      </NavLink>
      <NavLink
        to="/diagrams"
        className="dot"
        style={({ isActive }) => {
          return {
            background: isActive ? "#998B8F" : "#cac4c5",
          };
        }}
      >
        <FontAwesomeIcon icon={faChartPie} />
      </NavLink>
    </div>
  );
};

export default Menu;
