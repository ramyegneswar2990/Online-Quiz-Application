import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AdminRegistration.css"; // Ensure this CSS file exists

const AdminRegistration = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (admin.password !== admin.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/admin-register", {
        name: admin.name,
        email: admin.email,
        password: admin.password,
      });

      setAdmin({ name: "", email: "", password: "", confirmPassword: "" });
      navigate("/Adminlogin");
    } catch (err) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <form className="registration-form" onSubmit={handleRegister} autoComplete="off">
        <h2>Admin Registration</h2>

        {/* Prevent autofill issues */}
        <input type="text" name="fakeusernameremembered" style={{ display: 'none' }} />
        <input type="password" name="fakepasswordremembered" style={{ display: 'none' }} />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={admin.name}
          onChange={handleChange}
          required
          autoComplete="off"
          readOnly
          onFocus={(e) => e.target.removeAttribute("readOnly")}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={admin.email}
          onChange={handleChange}
          required
          autoComplete="off"
          readOnly
          onFocus={(e) => e.target.removeAttribute("readOnly")}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={admin.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
          readOnly
          onFocus={(e) => e.target.removeAttribute("readOnly")}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={admin.confirmPassword}
          onChange={handleChange}
          required
          autoComplete="new-password"
          readOnly
          onFocus={(e) => e.target.removeAttribute("readOnly")}
        />

        <button type="submit">Register</button>

        <p>
          Already have an account?{" "}
          <Link to="/Adminlogin">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default AdminRegistration;
