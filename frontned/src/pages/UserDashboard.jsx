import React from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = ({ children }) => (
  <div className="dashboard-container">
    <aside className="sidebar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/home" className="nav-link">Home</Link>
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
        <li>
          <button className="logout-button">Logout</button>
        </li>
      </ul>
    </aside>
    <main className="main-content">
      {children} {/* This will display Courses.jsx content */}
    </main>
  </div>
);

export default UserDashboard;
