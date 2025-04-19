import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Add your logout logic here (like clearing localStorage or cookies)
    // For now, just redirect to login
    alert("admin signout successfully");
    navigate('/adminlogin');
  };

  return (
    <div className="top-navbar">
      <div className="navbar-left">
        <span className="logo">Admin Panel</span>
      </div>
      <div className="navbar-right">
        <Link to="/UserList" className="user-link">User List</Link>
        <Link to="/CourseList" className="course-link">CourseList</Link>
        <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default Sidebar;
