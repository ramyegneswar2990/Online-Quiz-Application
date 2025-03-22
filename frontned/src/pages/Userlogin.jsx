import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import "./Userlogin.css";

const UserLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser({ ...formData, action: "login", role: "user" });
            alert("User Logged In Successfully");
            navigate("/dashboard"); // Redirect to dashboard after successful login
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="user-login-container">
            <h2>User Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="submit-btn">Login</button>
            </form>
            <p className="switch-auth">
                Don't have an account? <Link to="/UserRegistration">Register</Link>
            </p>
        </div>
    );
};

export default UserLogin;
