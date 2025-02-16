 
const Question = require("../models/Question");

const createQuestion = async (req, res) => {
    const { text, options, correctAnswer, quizId } = req.body;

    try {
        const question = new Question({ text, options, correctAnswer, quiz: quizId });
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getQuestionsByQuiz = async (req, res) => {
    try {
        const questions = await Question.find({ quiz: req.params.quizId });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { createQuestion, getQuestionsByQuiz };
