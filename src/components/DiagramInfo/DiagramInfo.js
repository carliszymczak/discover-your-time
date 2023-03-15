import React, { useState, useEffect } from "react";
import "./style.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const options = {
  layout: {
    padding: 87,
  },
  plugins: {
    datalabels: {
      display: 'auto',
    },
    legend: {
      display: false,
    },
  },
};

const DiagramInfo = () => {
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
  const tasksNotDone = tasks.filter((item) => item.done === false).length;
  const tasksDone = tasks.filter((item) => item.done === true);
  const plannedImprove = tasks.filter((item) => item.category === 2).length;
  const plannedFreeTime = tasks.filter((item) => item.category === 1).length;
  const plannedWork = tasks.filter((item) => item.category === 0).length;

  const doneImprove = tasks.filter(
    (item) => item.category === 2 && item.done === true
  ).length;
  const doneFreeTime = tasks.filter(
    (item) => item.category === 1 && item.done === true
  ).length;
  const doneWork = tasks.filter(
    (item) => item.category === 0 && item.done === true
  ).length;

  const doneFromPlanedPercentage = Math.round(
    (tasksDone.length / tasks.length) * 100
  );

  const dataPlanned = {
    labels: ["Work", "Free time", "Improve",],
    plugins: [ChartDataLabels],
    datasets: [
      {
        label: "",
        data: [plannedWork, plannedFreeTime, plannedImprove],
        backgroundColor: ["#5A555B", "#AB9FA3", "#81787F"],
        borderColor: ["#5A555B", "#AB9FA3", "#81787F"],
        borderWidth: 1,
        datalabels: {
          labels: {
            index: {
              color: "#404040",
              font: {
                size: 18,
              },
              formatter: (val, ctx) => ctx.chart.data.labels[ctx.dataIndex],
              align: "end",
              anchor: "end",
            },
          },
        },
      },
    ],
  };

  const dataDone = {
    labels: ["Work", "Free time", "Improve", "Not done"],
    plugins: [ChartDataLabels],
    datasets: [
      {
        label: "",
        data: [doneWork, doneFreeTime, doneImprove, tasksNotDone],
        backgroundColor: ["#5A555B", "#AB9FA3", "#81787F", "#353339"],
        borderColor: ["#5A555B", "#AB9FA3", "#81787F", "#353339"],
        borderWidth: 1,
        datalabels: {
          labels: {
            index: {
              color: "#404040",
              font: {
                size: 18,
              },
              formatter: (val, ctx) => ctx.chart.data.labels[ctx.dataIndex],
              align: "end",
              anchor: "end",
            },
          },
        },
      },
    ],
  };

  return (
    <div className="diagram-info-wrapper">
      <h2>
        Diagrams for
        <br /> MONDAY
      </h2>
      <div className="card">
        <h4>How you planed</h4>
        <div className="diagram-info-box">
          <Doughnut data={dataPlanned} options={options} />
        </div>
        <h4>How it goes</h4>
        <div className="diagram-info-box">
          <Doughnut data={dataDone} options={options} />
        </div>
        <p>
          You did {doneFromPlanedPercentage}% <br />
          of today activities
        </p>
      </div>
    </div>
  );
};

export default DiagramInfo;
