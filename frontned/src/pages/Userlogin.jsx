import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./UserLogin.css";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/user-login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "user");
      setEmail("");
      setPassword("");
      navigate("/UserDashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleLogin} autoComplete="off">
        {/* Hidden dummy inputs to prevent autofill */}
        <input type="text" name="fakeusernameremembered" style={{ display: 'none' }} />
        <input type="password" name="fakepasswordremembered" style={{ display: 'none' }} />

        <h2>User Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="off"
          readOnly
          onFocus={(e) => e.target.removeAttribute('readOnly')}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          readOnly
          onFocus={(e) => e.target.removeAttribute('readOnly')}
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account?{" "}
          <Link to="/UserRegistration">Click to Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;
