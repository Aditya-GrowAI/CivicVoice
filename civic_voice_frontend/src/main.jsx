import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from './components/register';
import Login from './components/login';
import NavBar from './components/navBar';
import Home from './components/navBarHome.jsx';
import Problems from './components/problems.jsx';
import Requests from './components/requests.jsx';
import Contact from './components/contact.jsx';
import About from './components/about.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "problems", element: <Problems /> },
      { path: "requests", element: <Requests /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <About /> },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router = {router} />
  </React.StrictMode>,
)
