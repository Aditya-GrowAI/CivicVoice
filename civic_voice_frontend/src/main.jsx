import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import HomeLayout from "./components/HomeLayout.jsx";

import LandingPage from "./components/LandingPage.jsx";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
import Home from "./components/home.jsx";
import Problems from "./components/problems.jsx";
import Requests from "./components/requests.jsx";
import Admin from "./components/admin.jsx";
import About from "./components/about.jsx";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

      { index: true, element: <LandingPage /> },

      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },

      {
        element: <HomeLayout />,
        children: [
          { path: "home", element: <Home /> },
          { path: "problems", element: <Problems /> },
          { path: "requests", element: <Requests /> },
          { path: "admin", element: <Admin /> },
          { path: "about", element: <About /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
