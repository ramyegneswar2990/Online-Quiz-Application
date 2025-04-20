import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses/");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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

        {loading ? (
          <p>Loading courses...</p>
        ) : (
          <div className="courses-grid">
            {courses.map((course, index) => {
              
              const path = `/courses/${course.name}`;
              return (
                <Link key={index} to={path} className="course-box">
                 
                  <h2>{course.name}</h2>
            
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Courses;
