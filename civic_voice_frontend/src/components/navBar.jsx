import { Link, NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./home";
import './home.css';

function NavBar() {
  return (
    <div className="container-fluid px-3">
      <header className="navbar shadow-sm bg-white">
        <div className="row w-100 align-items-center">
          <div className="col-md-3"></div>

          <div className="col-md-6 d-flex justify-content-center">
            <ul className="nav nav-pills">
              {["Home", "Problems", "Requests", "Admin", "About"].map((item) => (
                <li className={`nav-item ${item === "Home" ? "active" : ""}`} key={item}>
                  <span className={`nav-link ${item === "Home" ? "active" : ""}`}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-3 d-flex justify-content-end gap-2">
            <Link
              to="/login"
              className="btn btn-outline-primary auth-btn text-decoration-none"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-outline-primary auth-btn text-decoration-none"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>
      <section className="hero-section text-center">
        <h1>Your Voice for a Better City</h1>
        <p>
          Report real civic issues like potholes, water leakage, and garbage
          with location & image. Our AI detects the issue and alerts authorities.
        </p>
      </section>
    </div>
  );
}

export default NavBar;
