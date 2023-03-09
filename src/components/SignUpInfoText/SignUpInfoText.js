import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import InfoBox from "../InfoBox/InfoBox";
import "./style.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const SignUpInfoText = () => {
  return (
    <InfoBox>
      <div className="sign-up-info-wrapper">
        <div className="sign-up-info-top">
          <h4 className="sign-up-info-title">Sign up Infromation</h4>
          <Link to="/sign-up">
            <FontAwesomeIcon
              className="sign-up-info-icon"
              icon={faCircleXmark}
            />
          </Link>
        </div>
        <p className="sign-up-info-text">
          Your login serves as your name or nickname that will be displayed in
          the website panel, and all communication directed to you will include
          it. <br />
          <br /> Please note that the login cannot contain any numbers, only
          letters, and it cannot be changed, so please carefully consider your
          choice.
          <br />
          <br /> If you experience any issues, please contact us at:
          <br />
          <br />
          <a href="mailto:discoveryourtime@support.ok">
            discoveryourtime@support.ok
          </a>
        </p>
      </div>
    </InfoBox>
  );
};

export default SignUpInfoText;
