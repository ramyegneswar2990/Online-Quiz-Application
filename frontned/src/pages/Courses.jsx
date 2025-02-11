import React from "react";
import { Link } from "react-router-dom";
import { FaLaptopCode, FaNetworkWired, FaCode, FaPython, FaJava, FaCuttlefish, FaMicrochip, FaCalculator, FaProjectDiagram } from "react-icons/fa";
import "./Courses.css";
import UserDashboard from "./UserDashboard"; // Import UserDashboard to include sidebar

const courses = [
  { name: "Operating Systems", path: "/os", icon: <FaMicrochip />, desc: "Learn process management, memory, and file systems." },
  { name: "Computer Networks", path: "/cn", icon: <FaNetworkWired />, desc: "Understand networking concepts and protocols." },
  { name: "Software Engineering", path: "/se", icon: <FaProjectDiagram />, desc: "Learn software design and development models." },
  { name: "Aptitude", path: "/aptitude", icon: <FaCalculator />, desc: "Sharpen your logical and problem-solving skills." },
  { name: "Data Structures & Algorithms", path: "/dsa", icon: <FaLaptopCode />, desc: "Master algorithms and data structures for coding." },
  { name: "C++", path: "/cpp", icon: <FaCode />, desc: "Enhance your C++ programming skills." },
  { name: "Python", path: "/python", icon: <FaPython />, desc: "Explore Python for AI, ML, and development." },
  { name: "Java", path: "/java", icon: <FaJava />, desc: "Master Java for backend and app development." },
  { name: "C", path: "/c", icon: <FaCuttlefish />, desc: "Fundamentals of C programming." }
];

const Courses = () => {
  return (
    <UserDashboard>
      <div className="main-content">
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
      </div>
    </UserDashboard>
  );
};

export default Courses;
