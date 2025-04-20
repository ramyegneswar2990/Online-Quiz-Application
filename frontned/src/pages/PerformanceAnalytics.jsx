import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link, useNavigate } from "react-router-dom";
import "./PerformanceAnalytics.css"; // Optional styling

const data = [
  { name: "Week 1", score: 60 },
  { name: "Week 2", score: 75 },
  { name: "Week 3", score: 80 },
  { name: "Week 4", score: 90 },
  { name: "Week 5", score: 85 },
];

const PerformanceAnalytics = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/UserDashboard" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/courses" className="nav-link">Courses</Link>
          </li>
          <li className="nav-item">
            <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/certificate" className="nav-link">Certificate</Link>
          </li>
          <li className="nav-item">
            <Link to="/analytics" className="nav-link">Analytics</Link>
          </li>
          <li>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </aside>

      {/* Analytics Main Section */}
      <div className="analytics-container">
        <h2 className="analytics-title">📊 Performance Analytics</h2>
        <p className="analytics-subtitle">
          Track your quiz progress over time and identify areas to improve.
        </p>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <Line
                type="monotone"
                dataKey="score"
                stroke="#4CAF50"
                strokeWidth={3}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
