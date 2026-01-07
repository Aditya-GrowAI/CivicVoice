import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.jpeg";
import "bootstrap-icons/font/bootstrap-icons.css";

function NavBarHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="container-fluid px-4">
      <header className="navbar shadow-sm bg-white">
        <div className="row w-100 align-items-center">

          <div className="col">
            <NavLink to="/home">
              <img className="logo" src={Logo} alt="logo" />
            </NavLink>
          </div>

          <div className="col-md-6 d-flex justify-content-center">
            <ul className="nav nav-pills">
              {[
                { name: "Home", path: "/home" },
                { name: "Problems", path: "/problems" },
                { name: "Requests", path: "/requests" },
                { name: "Admin", path: "/admin" },
                { name: "About", path: "/about" },
              ].map((item) => (
                <li className="nav-item" key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active" : "")
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-3 d-flex justify-content-end">
            <div className="dropdown">
              <button
                className="btn btn-link text-dark dropdown-toggle p-0"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-list fs-3"></i>
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </header>
    </div>
  );
}

export default NavBarHome;
