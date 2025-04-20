import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './courselist.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

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
      setIsSubmitted(true);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong while adding the course. Please try again.");
      }
    }
  };

  return (
    <div className="main-container">
      <h2>📚 Course Management</h2>

      {/* Course List */}
      <div className="course-list">
        {courses.map((course) => (
          <div className="course-box" key={course.id}>
            <h3> {course.name}</h3>
            <div className="button-group">
              <button onClick={() => navigate(`/add-topic/${course.name}`)}>
                ➕ Add Topic
              </button>
              <button onClick={() => navigate(`/add-question/${course.name}`)}>
                ➕ Add Question
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Course */}
      <div className="add-course-form">
        <h3>➕ Add New Course</h3>
        {isSubmitted && error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Course Name"
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
        />
        <button onClick={handleAddCourse}>Add Course</button>
      </div>
    </div>
  );
};

export default CourseList;
