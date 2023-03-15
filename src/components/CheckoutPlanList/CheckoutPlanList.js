import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import React, { useState, useEffect } from "react";
import PlanWidget from "../PlanWidget/PlanWidget";
import "./style.css";

const CheckoutPlanList = () => {
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
    <div className="checkout-plan-wrapper">
      <h3>
        Let's checkout <br />
        plan TODAY
      </h3>
      <div className="card">
        {tasks.map((item, index) => (
          <PlanWidget
            key={item.id}
            itemId={item.id}
            nameActivity={item.name}
            descriptionActivity={item.description}
            timeActivity={item.time}
            categoryActivityIndex={item.category}
            isChecked={item.done}
          />
        ))}
        {tasks.length === 0 && (
          <div className="empty-plan">
            <h3>Empty plan</h3>
            <p>
              You don't have any plan for today. <br />
              Let's add some plan
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPlanList;
