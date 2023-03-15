import React, { useState, useEffect } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const PlanWidget = ({
  nameActivity,
  descriptionActivity,
  timeActivity,
  categoryActivityIndex,
  itemId
}) => {
  const [itemDetails, setItemDetails] = useState()
  const userId = localStorage.getItem("userId");

  const classNameWidget = () => {
    switch (categoryActivityIndex) {
      case 0:
        return "dark";
      case 1:
        return "light";
      case 2:
        return "medium";
    }
  };

  const categories = ["Work", "Free time", "Improve"];

  const fetchTask = async () => {
    const taskCollectionRef = doc(db, "users", userId, "tasks", itemId);
    await getDoc(taskCollectionRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setItemDetails(data);
      } else {
        console.log("No such document!");
      }
    });
  };

  const invertDone = async () => {
    try {
      const taskCollectionRef = doc(db, "users", userId, "tasks", itemId);
      await updateDoc(taskCollectionRef, {
        ...itemDetails,
        done: !itemDetails.done // zmiana wartości klucza "done" na przeciwną (toggle)
      });
      console.log("Task updated successfully!");
    } catch (e) {
      console.error("Error updating task: ", e);
    }
    fetchTask()
  };
  
  useEffect(() => {
    fetchTask();
  }, [itemId]);

  console.log(itemDetails)
  return (
    <div className={"widget-plan " + classNameWidget()}>
      <div className="widget-plan-box">
        <div className="widget-plan-box__circle">
          {categories[categoryActivityIndex]}
        </div>
      </div>
      <div className="widget-plan-text">
        <div className="widget-plan-activity">
          <input
            type="text"
            placeholder="Name of activity"
            value={nameActivity}
            disabled
            className="widget-plan-input"
          />
        </div>
        <div className="widget-plan-description">
          <input
            type="text"
            placeholder="Write description"
            value={descriptionActivity}
            className="widget-plan-input"
            disabled
          />
        </div>
        <div className="widget-plan-time">
          When it should be done:{" "}
          <input
            type="time"
            value={timeActivity}
            className="widget-plan-input"
            disabled
          />
        </div>
      </div>
      <div className="widget-plan-check" onClick={invertDone}>
        {itemDetails?.done && <FontAwesomeIcon icon={faCheck} />}
      </div>
    </div>
  );
};

export default PlanWidget;
