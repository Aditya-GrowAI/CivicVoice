import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL; 

function Register() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");

    if (!email || !pass || !confirmPass) {
      setErr("Please fill all fields!");
      return;
    }

    if (pass !== confirmPass) {
      setErr("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: pass,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErr(data.detail || data.msg || "Registration failed");
        return;
      }

      alert("Registration successful");
      navigate("/home");
    } catch (error) {
      setErr("Server Error");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light loginRegisterBG">
      <main className="shadow rounded p-4 boxx" style={{ maxWidth: "400px", width: "100%" }}>
        <form onSubmit={handleRegister}>
          <center>
            <h1 className="text-white mb-3">Register</h1>
          </center>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <label>Password</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            <label>Confirm Password</label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">
            Register
          </button>

          <p className="mt-3 mb-0 text-white">
            Already have an account? <Link to="/login">Login</Link>
          </p>

          {err && <div className="text-white mt-2">{err}</div>}
        </form>
      </main>
    </div>
  );
}

export default Register;
