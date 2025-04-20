import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./AddQuestion.css"; // <-- ADD this line!

const AddQuestion = () => {
  const { courseName } = useParams();
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses");
        const course = response.data.find(
          (c) => c.name.toLowerCase() === courseName.toLowerCase()
        );
        if (course) {
          setTopics(course.topics || []);
        } else {
          alert("Course not found");
        }
      } catch (err) {
        console.error("Error fetching course topics:", err);
      }
    };

    fetchTopics();
  }, [courseName]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTopicId || !question || options.some((opt) => !opt) || !answer) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      await axios.post(
        `http://localhost:5000/api/courses/addcourse/${courseName}/topics/${selectedTopicId}/questions`,
        { question, options, answer }
      );
      alert("Question added successfully!");
      navigate("/CourseList");
    } catch (error) {
      console.error("Failed to add question:", error);
      setError("Error adding question. Please try again.");
    }
  };

  return (
    <div className="add-question-container">
      <div className="add-question-form">
        <h2>Add Question to "{courseName}"</h2>

        {error && <p className="error-message">{error}</p>}

        <div>
          <label>Select Topic:</label>
          <select
            value={selectedTopicId}
            onChange={(e) => setSelectedTopicId(e.target.value)}
          >
            <option value="">-- Select Topic --</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
        </div>

        {selectedTopicId && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Question:</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>

            {options.map((opt, i) => (
              <div key={i}>
                <label>Option {i + 1}:</label>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  required
                />
              </div>
            ))}

            <div>
              <label>Correct Answer:</label>
              <select
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              >
                <option value="">-- Select Answer --</option>
                {options.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit">Add Question</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddQuestion;
