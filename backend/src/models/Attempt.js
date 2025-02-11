const mongoose = require("mongoose");

const AttemptSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    score: { type: Number, default: 0 },
    totalQuestions: { type: Number, required: true },
    answers: [{ questionId: mongoose.Schema.Types.ObjectId, selectedOption: Number }]
}, { timestamps: true });

module.exports = mongoose.model("Attempt", AttemptSchema);
