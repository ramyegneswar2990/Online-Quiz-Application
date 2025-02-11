const mongoose = require("mongoose");

const LeaderboardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
    totalScore: { type: Number, default: 0 },
    quizzesAttempted: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Leaderboard", LeaderboardSchema);
