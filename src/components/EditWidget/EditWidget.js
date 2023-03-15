import React, { useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const EditWidget = ({
  nameActivity,
  descriptionActivity,
  timeActivity,
  categoryActivityIndex,
  newWidget,
  onAdd,
}) => {
  const [categoryIndex, setCategoryIndex] = useState(
    categoryActivityIndex || 0
  );
  const [name, setName] = useState(nameActivity || "");
  const [description, setDescription] = useState(descriptionActivity || "");
  const [time, setTime] = useState(timeActivity || "");
  const userId = localStorage.getItem("userId");

  const classNameWidget = () => {
    switch (categoryIndex) {
      case 0:
        return "dark";
      case 1:
        return "light";
      case 2:
        return "medium";
    }
  };

  const categories = ["Work", "Free time", "Improve"];

  const onClickCircle = () => {
    if (categoryIndex === 2) {
      setCategoryIndex(0);
    } else {
      setCategoryIndex(categoryIndex + 1);
    }
  };

  const addTask = async (taskData) => {
    try {
      const tasksCollection = collection(db, "users", userId, "tasks");
      const newTaskRef = await addDoc(tasksCollection, taskData);
      const taskId = newTaskRef.id;
      onAdd();
      setName("");
      setDescription("");
      setTime("");
      setCategoryIndex(0);
      console.log("New task added with ID: ", taskId);
    } catch (e) {
      console.error("Error adding task: ", e);
    }
  };

  const onAddClick = () => {
    if (name && description && time) {
      addTask({
        name: name,
        description: description,
        time: time,
        category: categoryIndex,
        done: false,
      });
    } else {
      alert("Wypełnij wszystkie pola");
    }
  };

  return (
    <div
      className={"widget-edit " + classNameWidget()}
      style={newWidget && { transform: "scale(1.15)", marginTop: "12px" }}
    >
      <div className="widget-edit-box">
        <div className="widget-edit-box__circle" onClick={onClickCircle}>
          {categories[categoryIndex]}
        </div>
      </div>
      <div className="widget-edit-text">
        <div className="widget-edit-activity">
          <input
            type="text"
            placeholder="Name of activity"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="widget-edit-input"
            disabled={!newWidget}
          />
        </div>
        <div className="widget-edit-description">
          <input
            type="text"
            placeholder="Write description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="widget-edit-input"
            disabled={!newWidget}
          />
        </div>
        <div className="widget-edit-time">
          When it should be done:{" "}
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="widget-edit-input"
            disabled={!newWidget}
          />
        </div>
      </div>
      {onAdd && (
        <button onClick={onAddClick} className="widget-edit-button__add">
          <FontAwesomeIcon icon={faCirclePlus} />
        </button>
      )}
    </div>
  );
};

export default EditWidget;
