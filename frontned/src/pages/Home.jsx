import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="glass-card">
        <h1>Welcome to the Quiz Portal</h1>
        <p>Challenge yourself with exciting quizzes and track your progress!</p>
        <div className="buttons">
          <Link to="/Userlogin" className="btn user-btn">User Login</Link>
          <Link to="/Adminlogin" className="btn admin-btn">Admin Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
