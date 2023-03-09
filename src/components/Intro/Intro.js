import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Intro = () => {
  const isSignedIn = localStorage.getItem("name");

  const linkHref = isSignedIn ? "/home" : "/sign-up";
  return (
    <div className="intro-wrapper">
      <span className="intro-text">HELLO !</span>
      <h1>
        Discover <span>Your</span> Time
      </h1>
      <Link to={linkHref} className="intro-arrow">
        <FontAwesomeIcon icon={faArrowRight} />
      </Link>
      <div className="intro-mask" />
      <Link className="intro-button" to={linkHref}>
        Get Started
      </Link>
    </div>
  );
};

export default Intro;
