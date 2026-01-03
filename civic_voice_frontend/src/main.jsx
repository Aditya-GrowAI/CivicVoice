import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from './components/register';
import Login from './components/login.jsx';
import NavBar from './components/navBar';
import Home from './components/home.jsx';
import Problems from './components/problems.jsx';
import Requests from './components/requests.jsx';
import Admin from './components/admin.jsx';
import About from './components/about.jsx';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "problems", element: <Problems /> },
      { path: "requests", element: <Requests /> },
      { path: "admin", element: <Admin /> },
      { path: "about", element: <About /> },
      { path: "home", element: <Home /> },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router = {router} />
  </React.StrictMode>,
)
