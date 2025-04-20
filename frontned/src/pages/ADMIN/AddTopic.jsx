import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddTopic.css"; // Import your new CSS file

const AddTopic = () => {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const [topicName, setTopicName] = useState("");
  const [error, setError] = useState("");

  const handleAddTopic = async (e) => {
    e.preventDefault();
    if (!topicName.trim()) {
      setError("Topic name is required!");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/courses/addcourse/${courseName}/topics`,
        { name: topicName }
      );
      alert("Topic added successfully!");
      navigate("/CourseList");
    } catch (error) {
      console.error("Error adding topic:", error);
    
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
    <div className="add-topic-container">
      <div className="add-topic-box">
        <h2>Add Topic to: {courseName}</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleAddTopic}>
          <label htmlFor="topicName">Topic Name:</label>
          <input
            type="text"
            id="topicName"
            placeholder="Enter topic name"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
          />
          <button type="submit">Add Topic</button>
        </form>
      </div>
    </div>
  );
};

export default AddTopic;
