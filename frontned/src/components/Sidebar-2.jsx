import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar-2.css';

const Sidebar2 = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("User logged out successfully");
    navigate('/'); // Adjust this to your login route
  };

  return (
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
      </ul>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </aside>
  );
};

export default Sidebar2;
