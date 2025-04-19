import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = ({ children }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear local storage or session (if used)
    localStorage.removeItem('user'); // or whatever key you're using
    // Redirect to login page
    navigate('/userlogin');
    // Optionally show alert
    alert('User signed out successfully');
  };

  return (
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
            <button className="signout" onClick={handleSignOut}>Sign Out</button>
          </li>
        </ul>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default UserDashboard;
