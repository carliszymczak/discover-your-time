import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import React, { useState, useEffect } from "react";
import EditWidget from "../EditWidget/EditWidget";
import "./style.css";

const AddActivityForm = () => {
  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchTasks = async () => {
    const tasksCollection = collection(db, "users", userId, "tasks");
    await getDocs(tasksCollection).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTasks(
        newData.sort(function (a, b) {
          var timeA = a.time.toUpperCase();
          var timeB = b.time.toUpperCase();
          if (timeA < timeB) {
            return -1;
          }
          if (timeA > timeB) {
            return 1;
          }
          return 0;
        })
      );
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="add-activity-wrapper">
      <h3>
        Let's start plan <br />
        TODAY
      </h3>
      <div className="card">
        {tasks.map((item, index) => (
          <EditWidget
            key={item.id}
            nameActivity={item.name}
            descriptionActivity={item.description}
            timeActivity={item.time}
            categoryActivityIndex={item.category}
          />
        ))}
        <EditWidget newWidget onAdd={() => fetchTasks()} />
      </div>
    </div>
  );
};

export default AddActivityForm;
