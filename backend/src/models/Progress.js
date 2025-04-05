const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: false },
    score: { type: Number, default: 0 }, // Stores quiz scores if any
    completed: { type: Boolean, default: false }, // Marks if topic is completed
    timestamp: { type: Date, default: Date.now } // Tracks completion time
});

module.exports = mongoose.model("Progress", ProgressSchema);
