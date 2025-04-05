const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Attempt = require("../models/Attempt"); // Track quiz attempts
const Progress = require("../models/Progress");

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

// ✅ Submit Quiz and Get Results
const submitQuiz = async (req, res) => {
    try {
        const { userId, quizId, answers } = req.body;
        const quiz = await Quiz.findById(quizId).populate("questions");

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        let score = 0;
        let totalQuestions = quiz.questions.length;

        for (let i = 0; i < totalQuestions; i++) {
            if (answers[i] === quiz.questions[i].correctOption) {
                score++;
            }
        }

        // Save quiz attempt
        const attempt = new Attempt({
            userId,
            quizId,
            score,
            totalQuestions,
        });

        await attempt.save();

        // ✅ Update user progress in Progress Model
        let progress = await Progress.findOne({ userId, courseId: quiz.courseId });

        if (progress && !progress.completedTopics.includes(quiz.topic)) {
            progress.completedTopics.push(quiz.topic);
            await progress.save();
        }

        res.status(200).json({ message: "Quiz submitted", score, totalQuestions });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { createQuiz, getQuizzesByTopic, submitQuiz };
