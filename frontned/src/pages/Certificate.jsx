import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Certificate.css";

const courses = [
  "Operating Systems (OS)",
  "Computer Networks (CN)",
  "Software Engineering (SE)",
  "Aptitude",
  "Data Structures and Algorithms",
  "C++ Programming",
  "Python Programming",
  "Java Programming",
  "C Programming"
];

const Certificate = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [username, setUsername] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // ✅ NEW

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  const handleDownload = async () => {
    if (!username) {
      alert("You must be logged in to download the certificate.");
      return;
    }

    if (!selectedCourse) {
      alert("Please select a course.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/certificate/${username}/${encodeURIComponent(selectedCourse)}`,
        { responseType: "blob" }
      );

      const percentage = response.headers["x-percentage"] || "82.00%"; // change if backend supports it

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${selectedCourse}_Certificate.pdf`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);

      setErrorMessage("");
      setSuccessMessage(`🎉 Congratulations! Your certificate has been downloaded. You scored ${percentage} in this course.`); // ✅ NEW
    } catch (error) {
      setSuccessMessage(""); // clear previous success message
      if (error.response) {
        try {
          const data = await error.response.data.text();
          const parsed = JSON.parse(data);
          if (parsed.message && parsed.percentage) {
            setErrorMessage(`${parsed.message} Your current score is ${parsed.percentage}.`);
          } else if (parsed.message) {
            setErrorMessage(parsed.message);
          } else {
            setErrorMessage("Something went wrong while downloading.");
          }
        } catch (err) {
          setErrorMessage("Something went wrong while downloading.");
        }
      } else {
        console.error("Error downloading certificate:", error);
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="outbox">
      <div className="certificate-container">
        <div className="certificate-title">Get Your Course Certificate</div>
        <div className="certificate-subtitle">
          Select a course to download your certificate. If you're eligible, it will download. Otherwise, keep practicing!
        </div>

        <select
          value={selectedCourse}
          onChange={(e) => {
            setSelectedCourse(e.target.value);
            setErrorMessage("");
            setSuccessMessage(""); // clear success message on change
          }}
          className="course-dropdown"
        >
          <option value="">Select a Course</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>

        <button onClick={handleDownload} className="download-btn">
          Download Certificate
        </button>

        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Certificate;
