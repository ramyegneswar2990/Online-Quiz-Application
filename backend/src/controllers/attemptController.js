const Attempt = require("../models/Attempt");

const recordAttempt = async (req, res) => {
    const { userId, quizId, score } = req.body;

    try {
        const attempt = new Attempt({ user: userId, quiz: quizId, score });
        await attempt.save();
        res.status(201).json(attempt);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getUserAttempts = async (req, res) => {
    try {
        const attempts = await Attempt.find({ user: req.params.userId });
        res.json(attempts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { recordAttempt, getUserAttempts };
