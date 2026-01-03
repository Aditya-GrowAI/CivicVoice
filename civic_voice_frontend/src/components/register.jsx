import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(""); 
  const [confirmPass, setConfirmPass] = useState("");
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
    try{
      const res = await fetch("http://localhost:8000/register",{
        method:"POST",
        headers:{"Content-type": "application/json"},
        body:JSON.stringify({
          email: email,
          password: pass,
        })
      })
      const data = await res.json();
      if(!res.ok){
        setErr(data.detail || data.msg || "Registration failed");
        return;
      }
      alert("Registration successful");
      navigate('/home');
    }
    catch(error){
      setErr("Server Error");
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <main
        className="shadow rounded p-4 bg-white"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <form onSubmit={handleRegister}>
          <center>
            <h1 className="text-primary mb-3">Register</h1>
          </center>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              placeholder="name@example.com"
              onChange={(e)=>setEmail(e.target.value)}
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
              onChange={(e)=>setPass(e.target.value)}
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
              onChange={(e)=>setConfirmPass(e.target.value)}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">
            Register
          </button>
          <p className="mt-3 mb-0 text-left">
            Already have an account? <Link to="/login">Login</Link>
          </p>
          {err && <div className="text-danger mt-2">{err}</div>}
        </form>
      </main>
    </div>
  );
}

export default Register;
