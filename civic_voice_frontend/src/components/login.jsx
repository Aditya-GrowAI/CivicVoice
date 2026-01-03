import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    if (!email || !pass) {
      setErr("Please fill all fields!");
      return;
    }
    try{
      const res = await fetch("http://localhost:8000/login",{
        method:"POST",
        headers:{"Content-type": "application/json"},
        body:JSON.stringify({
          email: email,
          password: pass,
        })
      })
      const data = await res.json();
      if(!res.ok){
        setErr(data.msg);
        return;
      }
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
        <form onSubmit={handleLogin}>
          <center>
            <h1 className="text-primary mb-3">Login</h1>
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

          <button className="btn btn-primary w-100 py-2" type="submit">
            Login
          </button>
          {err && <div>{err}</div>}
        </form>
      </main>
    </div>
  );
}

export default Login;
