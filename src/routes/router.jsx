import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../components/home/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import PrivateRoute from "./PrivateRoute";
import AllJobs from "../components/jobs/AllJobs";
import AddJob from "../components/jobs/AddJob";
import JobDetails from "../components/jobs/JobDetails";
import UpdateJob from "../components/jobs/UpdateJob";

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
            <AddJob />
          </PrivateRoute>
        ),
      },
      {
        path: "/allJobs",
        element: <AllJobs />,
      },
      { path: "/allJobs/:id", element: <JobDetails /> },
      {
        path: "/updateJob/:id",
        element: (
          <PrivateRoute>
            <UpdateJob />
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
