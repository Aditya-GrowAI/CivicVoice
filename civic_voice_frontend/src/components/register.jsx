import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

function Register() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
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
    
    setLoading(true);
    
    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: pass,
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setErr(data.detail || data.msg || "Registration failed");
        return;
      }
      
      alert("Registration successful");
      navigate('/home');
    }
    catch (error) {
      setErr("Server Error: " + error.message);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <main
        className="shadow rounded p-4 bg-white"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <form onSubmit={handleRegister}>
          <div className="text-center">
            <h1 className="text-primary mb-3">Register</h1>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              value={pass}
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
              disabled={loading}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPass}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPass(e.target.value)}
              disabled={loading}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>

          <button 
            className="btn btn-primary w-100 py-2" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          
          <p className="mt-3 mb-0">
            Already have an account? <Link to="/login">Login</Link>
          </p>
          
          {err && <div className="alert alert-danger mt-2 mb-0">{err}</div>}
        </form>
      </main>
    </div>
  );
}

export default Register;
