const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  id: Number,
  name: String,
  questions: [
    {
      id: Number,
      question: String,
      options: [String],
      answer: String
    }
  ]
});

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  topics: [TopicSchema]
});

module.exports = mongoose.model("Course", CourseSchema);
