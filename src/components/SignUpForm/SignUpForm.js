import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InfoBox from "../InfoBox/InfoBox";
import "./style.css";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [isInvalidName, setInvalidName] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);

    const validName = /^[a-zA-Z ]+$/g.test(e.target.value);

    if (!validName && e.target.value.length > 0) {
      setInvalidName(true);
    } else {
      setInvalidName(false);
    }
  };

  const onNextClick = (e) => {
    if (!isInvalidName) {
      localStorage.setItem("name", name);
    }
  };

  const linkHref = !isInvalidName ? "/home" : "";
  return (
    <InfoBox>
      <div className="sign-up-wrapper">
        <div className="sign-up-top">
          <h4 className="sign-up-title">Sign up</h4>
          <Link to="/sign-up-info">
            <FontAwesomeIcon
              className="sign-up-info-icon"
              icon={faCircleInfo}
            />
          </Link>
        </div>
        <p className="sign-up-text">Hello, what is your name?</p>
        {isInvalidName && (
          <p className="sign-up-error">
            Please enter your name using only letters, without any numbers.
          </p>
        )}
        <input
          className="input-text"
          placeholder="YOUR NAME"
          onChange={handleNameChange}
          value={name}
        />
        <Link to={linkHref} className="button-link" onClick={onNextClick}>
          <button className="button">Next</button>
        </Link>
      </div>
    </InfoBox>
  );
};

export default SignUpForm;
