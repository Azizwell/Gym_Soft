import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Home/Root.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuperAdmin from "./routes/SuperAdmin/SuperAdmin.jsx";
import Admin from "./routes/Admin/Admin.jsx";
import AddGymCom from "./routes/SuperAdmin/AddGymCom.jsx";
import AddAdmin from "./routes/SuperAdmin/AddAdmin.jsx";
import SettingSuperAdm from "./routes/SuperAdmin/SettingSuperAdm.jsx";
import AdminIndex from "./routes/Admin/AdminIndex.jsx";
import Rate from "./routes/Admin/Rate.jsx";
import GymUsers from "./routes/Admin/GymUsers.jsx";
import History from "./routes/Admin/History.jsx";
import UserHistory from "./routes/Admin/UserHistory.jsx";
import UserPaymentHistory from "./routes/Admin/UserPaymentHistory.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/super_admin",
    element: <SuperAdmin />,
    children: [
      {
        path: "gym",
        index: true,
        element: <AddGymCom />,
      },
      {
        path: "admin",
        element: <AddAdmin />,
      },
      {
        path: "setting",
        element: <SettingSuperAdm />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "index",
        element: <AdminIndex />,
      },
      {
        path: "rate",
        element: <Rate />,
      },
      {
        path: "users",
        element: <GymUsers />,
      },
      {
        path: "users/history",
        element: <UserHistory />,
      },
      {
        path: "users/history/payment",
        element: <UserPaymentHistory />,
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
);
