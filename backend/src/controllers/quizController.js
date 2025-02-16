const Quiz = require("../models/Quiz");

const createQuiz = async (req, res) => {
    const { title, topicId } = req.body;

    try {
        const quiz = new Quiz({ title, topic: topicId });
        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getQuizzesByTopic = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ topic: req.params.topicId });
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { createQuiz, getQuizzesByTopic };
