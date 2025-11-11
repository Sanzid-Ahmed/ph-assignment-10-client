import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../components/home/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Home page is public
      {
        index: true,
        element: <Home />,
      },
      // Private pages
      {
        path: "/addJob",
        element: (
          <PrivateRoute>
            <h1>Add Job Page (private)</h1>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-accepted-tasks",
        element: (
          <PrivateRoute>
            <h1>My Accepted Tasks (private)</h1>
          </PrivateRoute>
        ),
      },
      // Auth pages
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
