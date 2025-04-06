import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./UserDashboard.css";
import { FaTrophy, FaChartLine, FaQuestionCircle, FaCertificate } from "react-icons/fa";
import quizImg from "../assets/quiz.jpg"; // Replace with your image path

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/UserDashboard" className="nav-link">Home</Link></li>
          <li className="nav-item"><Link to="/courses" className="nav-link">Courses</Link></li>
          <li className="nav-item"><Link to="/leaderboard" className="nav-link">Leaderboard</Link></li>
          <li><button className="logout-button">Logout</button></li>
        </ul>
      </aside>

      <main className="main-content">
        <motion.div
          className="intro-section"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            🎓 Welcome to <span className="highlight-text">Proficiency Quiz</span>
          </motion.h1>

          <motion.p className="tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Empowering B.Tech students preparing for GATE, placements & beyond!
          </motion.p>

          <div className="dashboard-content">
            <motion.div
              className="dashboard-text"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2>📘 What is a Quiz?</h2>
              <p>
                A quiz is an interactive tool designed to assess your understanding and sharpen your knowledge.
                Our quizzes are built to be engaging, insightful, and effective.
              </p>
              <p className="animated-facts">
                🚀 Quick to answer <br />
                🎯 Targeted for core subjects <br />
                🧠 Smart preparation for <strong>GATE</strong> and <strong>Placements</strong>
              </p>
            </motion.div>

            <motion.img
              src={quizImg}
              alt="Quiz Illustration"
              className="dashboard-image"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            />
          </div>

          <motion.div
            className="features-grid"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            <motion.div className="feature-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <FaQuestionCircle className="feature-icon" />
              Topic-wise Quizzes
            </motion.div>
            <motion.div className="feature-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <FaChartLine className="feature-icon" />
              Performance Analytics
            </motion.div>
            <motion.div className="feature-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <FaTrophy className="feature-icon" />
              Live Leaderboard
            </motion.div>
            <motion.div className="feature-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <FaCertificate className="feature-icon" />
              Certification & Recognition
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default UserDashboard;
