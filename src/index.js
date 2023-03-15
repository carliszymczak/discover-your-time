import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Start from "./pages/Start";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignUpInfo from "./pages/SignUpInfo";
import Home from "./pages/Home";

import "./style.css";
import AddActivity from "./pages/AddActivity";
import Diagram from "./pages/Diagram";
import CheckoutPlan from "./pages/CheckoutPlan";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-up-info",
    element: <SignUpInfo />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/add-activity",
    element: <AddActivity />,
  },
  {
    path: "/checkout-plan",
    element: <CheckoutPlan />,
  },
  {
    path: "/diagrams",
    element: <Diagram />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="app-wrapper">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
