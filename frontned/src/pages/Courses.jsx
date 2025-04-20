// import React from "react";
// import { Link } from "react-router-dom";
// import { FaLaptopCode, FaNetworkWired, FaCode, FaPython, FaJava, FaCuttlefish, FaMicrochip, FaCalculator, FaProjectDiagram } from "react-icons/fa";
// import "./Courses.css";
// import UserDashboard from "./UserDashboard"; // Import UserDashboard to include sidebar

// const courses = [
//   { name: "Operating Systems", path: "/courses/Operating Systems (OS)", icon: <FaMicrochip />, desc: "Learn process management, memory, and file systems." },
//   { name: "Computer Networks ", path: "/courses/Computer Networks (CN)", icon: <FaNetworkWired />, desc: "Understand networking concepts and protocols." },
//   { name: "Software Engineering ", path: "/courses/Software Engineering (SE)", icon: <FaProjectDiagram />, desc: "Learn software design and development models." },
//   { name: "Aptitude", path: "/courses/Aptitude", icon: <FaCalculator />, desc: "Sharpen your logical and problem-solving skills." },
//   { name: "Data Structures and Algorithms", path: "/courses/Data Structures and Algorithms", icon: <FaLaptopCode />, desc: "Master algorithms and data structures for coding." },
//   { name: "C++ Programming", path: "/courses/C++ Programming", icon: <FaCode />, desc: "Enhance your C++ programming skills." },
//   { name: "Python Programming", path: "/courses/Python Programming", icon: <FaPython />, desc: "Explore Python for AI, ML, and development." },
//   { name: "Java Programming", path: "/courses/Java Programming", icon: <FaJava />, desc: "Master Java for backend and app development." },
//   { name: "C Programming", path: "/courses/C Programming", icon: <FaCuttlefish />, desc: "Fundamentals of C programming." },
//   {name: "FULL STACK",path:"/courses/FULL STACK"}
// ];

// const Courses = () => {
//   return (
//     <UserDashboard>
//       <div className="main-content">
//         <h1>Courses</h1>
//         <div className="courses-grid">
//           {courses.map((course, index) => (
//             <Link key={index} to={course.path} className="course-box">
//               <div className="icon">{course.icon}</div>
//               <h2>{course.name}</h2>
//               <p>{course.desc}</p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </UserDashboard>
//   );
// };

// export default Courses;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Courses.css";
import UserDashboard from "./UserDashboard";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // For loading spinner

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
    <UserDashboard>
      <div className="main-content">
        <h1>Courses</h1>
        {loading ? (
          <p>Loading courses...</p>
        ) : (
          <div className="courses-grid">
            {courses.map((course, index) => (
              <Link key={index} to={`/courses/${course.name}`} className="course-box">
                <h2>📘{course.name}</h2>
                <p>{course.desc}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </UserDashboard>
  );
};

export default Courses;


