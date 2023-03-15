import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import WidgetInfo from "../WidgetInfo/WidgetInfo";
import "./style.css";

const Main = () => {
  const [name, setName] = useState("");
  const userId = localStorage.getItem("userId");

  const fetchUser = async (userId) => {
    const userDocRef = doc(db, "users", userId);
    await getDoc(userDocRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setName(userData.id);
      } else {
        console.log("No such document!");
      }
    });
  };

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  return (
    <div className="main-wrapper">
      <h2>
        Hi {name}! <br />
        Nice to see you!
      </h2>
      <div className="card">
        <WidgetInfo
          name="Hello"
          title="Hi! Nice to meet you!"
          subtitle="What is this app?"
          description="It is to help you in the plans of everyday tasks and to show to what extent you manage to achieve them."
        />
        <WidgetInfo
          name="Plans"
          title="Plan your next day"
          subtitle="Choose 1 of 3 categories"
          description="Plans are divided into Work, Free time and Improve, so you can control how much time you spend on each zone."
          className="dark"
        />
        <WidgetInfo
          name="Stats"
          title="Just start"
          subtitle="Add tasks & diagrams"
          description="We will show you how many tasks you have completed, how many are left and how your schedule looks like on the diagram."
          className="medium"
        />
        <Link to="/add-activity">
          <button className="main-button">add activity</button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
