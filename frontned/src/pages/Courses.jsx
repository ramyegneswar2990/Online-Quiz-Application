// Courses.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaLaptopCode, FaNetworkWired, FaCode, FaPython, FaJava, FaCuttlefish, FaMicrochip, FaCalculator, FaProjectDiagram } from "react-icons/fa";
import "./Courses.css";

const courses = [
  { name: "Operating Systems", path: "/courses/Operating Systems (OS)", icon: <FaMicrochip />, desc: "Learn process management, memory, and file systems." },
  { name: "Computer Networks", path: "/courses/Computer Networks (CN)", icon: <FaNetworkWired />, desc: "Understand networking concepts and protocols." },
  { name: "Software Engineering", path: "/courses/Software Engineering (SE)", icon: <FaProjectDiagram />, desc: "Learn software design and development models." },
  { name: "Aptitude", path: "/courses/Aptitude", icon: <FaCalculator />, desc: "Sharpen your logical and problem-solving skills." },
  { name: "Data Structures and Algorithms", path: "/courses/Data Structures and Algorithms", icon: <FaLaptopCode />, desc: "Master algorithms and data structures for coding." },
  { name: "C++ Programming", path: "/courses/C++ Programming", icon: <FaCode />, desc: "Enhance your C++ programming skills." },
  { name: "Python Programming", path: "/courses/Python Programming", icon: <FaPython />, desc: "Explore Python for AI, ML, and development." },
  { name: "Java Programming", path: "/courses/Java Programming", icon: <FaJava />, desc: "Master Java for backend and app development." },
  { name: "C Programming", path: "/courses/C Programming", icon: <FaCuttlefish />, desc: "Fundamentals of C programming." }
  
];

const Courses = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/UserDashboard" className="nav-link">Home</Link></li>
          <li className="nav-item"><Link to="/courses" className="nav-link">Courses</Link></li>
          <li className="nav-item"><Link to="/leaderboard" className="nav-link">Leaderboard</Link></li>
          <li className="nav-item"><Link to="/certificate" className="nav-link">Certificate</Link></li>
          <li className="nav-item"><Link to="/analytics" className="nav-link">Analytics</Link></li>
          <li><button className="logout-button">Logout</button></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Courses</h1>
        <div className="courses-grid">
          {courses.map((course, index) => (
            <Link key={index} to={course.path} className="course-box">
              <div className="icon">{course.icon}</div>
              <h2>{course.name}</h2>
              <p>{course.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Courses;
