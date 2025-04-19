import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './courselist.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  const handleAddCourse = async (e) => {
         e.preventDefault();
         if (!newCourseName.trim()) {
               setError("Course name is required!");
               setIsSubmitted(true);
           return;
         }
    try {
      await axios.post("http://localhost:5000/api/courses/addcourse", {
        name: newCourseName,
      });
      setNewCourseName("");
      setIsSubmitted(false);
      fetchCourses();
    } catch (error) {
      //console.error("Error adding course", error);
      setIsSubmitted(true);
      if (error.response && error.response.data && error.response.data.message) {
        // If backend sends a specific error message
        setError(error.response.data.message);
      } else {
        // Fallback generic error
        setError("Something went wrong while adding the topic. Please try again.");
      }
    }
  };

  return (
    <div className="centered-content"> {/* <-- Apply the class here */}
      <div style={{ padding: "20px", width: "100%", maxWidth: "600px" }}>
        <h2>📚 Course Management</h2>

        {/* Display All Courses */}
        {courses.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <h3>📘 {course.name}</h3>

            {/* Navigation Buttons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "10px", justifyContent: "center" }}>
              <button onClick={() => navigate(`/add-topic/${course.name}`)}>
                ➕ Add Topic
              </button>
              <button onClick={() => navigate(`/add-question/${course.name}`)}>
                ➕ Add Question
              </button>
            </div>
          </div>
        ))}

        {/* Add Course Section */}
        <div
          style={{
            marginTop: "40px",
            borderTop: "1px solid #999",
            paddingTop: "20px",
          }}
        >
          <h3>📘 Add New Course</h3>
          {isSubmitted && error && <p className="error-message">{error}</p>}
          <input
            type="text"
            placeholder="Course Name"
            value={newCourseName}

            onChange={(e) => setNewCourseName(e.target.value)}
            
          />
            
          <button onClick={handleAddCourse}>➕ Add Course</button>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
