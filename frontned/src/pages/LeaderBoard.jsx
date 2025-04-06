import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Leaderboard.css";

const subjects = [
  "Operating Systems",
  "Computer Networks",
  "Software Engineering",
  "Aptitude",
  "Data Structures and Algorithms",
  "C++ Programming",
  "Python Programming",
  "Java Programming",
  "C Programming",
];

const LeaderboardPage = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (selectedCourse) {
      fetchLeaderboard(selectedCourse);
    }
  }, [selectedCourse]);

  const fetchLeaderboard = async (courseName) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/leaderboard/${courseName}`);
      setLeaderboard(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/UserDashboard" className="nav-link">Home</Link></li>
          <li className="nav-item"><Link to="/courses" className="nav-link">Courses</Link></li>
          <li className="nav-item"><Link to="/leaderboard" className="nav-link">Leaderboard</Link></li>
          <li><button className="logout-button">Logout</button></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h2 className="leaderboard-title">Leaderboard Based on Courses</h2>

        <div className="dropdown-container">
          <label htmlFor="course-select">Select Course:</label>
          <select
            id="course-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="course-select"
          >
            <option value="">-- Select a Course --</option>
            {subjects.map((subject, idx) => (
              <option key={idx} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {leaderboard.length > 0 ? (
          <div className="table-container">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Username</th>
                  <th>Total Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : selectedCourse && (
          <p className="no-data">No data available for this course.</p>
        )}
      </main>
    </div>
  );
};

export default LeaderboardPage;
