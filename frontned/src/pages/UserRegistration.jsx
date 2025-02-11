import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import "./UserRegistration.css"; // Ensure this CSS file is created

const UserRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/user-register", { email, password });
      setEmail(""); // Clear email field
      setPassword(""); // Clear password field
      setConfirmPassword(""); // Clear confirm password field
      navigate("/UserLogin");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <form className="registration-form" onSubmit={handleRegister} autoComplete="off">
        <h2>Create an Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <button type="submit">Register</button>
        <p>
          Already have an account?{" "}
          <Link to="/UserLogin">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default UserRegistration;
