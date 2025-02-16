const Leaderboard = require("../models/Leaderboard");

const addScore = async (req, res) => {
    const { userId, quizId, score } = req.body;

    try {
        const leaderboardEntry = new Leaderboard({ user: userId, quiz: quizId, score });
        await leaderboardEntry.save();
        res.status(201).json(leaderboardEntry);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getLeaderboardByQuiz = async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find({ quiz: req.params.quizId }).sort({ score: -1 });
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { addScore, getLeaderboardByQuiz };
