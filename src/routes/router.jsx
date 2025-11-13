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
import MyAcceptedTasks from "../components/jobs/MyAcceptedTasks";
import MyAddedJobs from "../components/jobs/MyAddedJobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
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
        element: (
          <PrivateRoute>
            <AllJobs />
          </PrivateRoute>
        ),
      },
      { 
        path: "/allJobs/:id", 
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ), 
      },
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
            <MyAcceptedTasks />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-added-tasks",
        element: (
          <PrivateRoute>
            <MyAddedJobs/>
          </PrivateRoute>
        ),
      },
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
