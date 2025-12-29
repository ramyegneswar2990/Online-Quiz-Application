const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    answer: { type: String, required: true }
});

const TopicSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    questions: [QuestionSchema]
});

const CourseSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    topics: [TopicSchema]
}, { timestamps: true });

module.exports = mongoose.model("Course", CourseSchema);
