const Progress = require("../models/Progress");

// Save quiz progress after completion
exports.submitQuiz = async (req, res) => {
    try {
        const { userId, courseId, topicId, score, totalQuestions, correctAnswers, wrongAnswers } = req.body;

        let progress = await Progress.findOne({ userId, courseId });

        if (!progress) {
            progress = new Progress({ userId, courseId, completedTopics: [] });
        }

        const topicIndex = progress.completedTopics.findIndex(t => t.topicId.toString() === topicId);

        if (topicIndex !== -1) {
            progress.completedTopics[topicIndex].quizScore = score;
            progress.completedTopics[topicIndex].totalQuestions = totalQuestions;
            progress.completedTopics[topicIndex].correctAnswers = correctAnswers;
            progress.completedTopics[topicIndex].wrongAnswers = wrongAnswers;
        } else {
            progress.completedTopics.push({ topicId, quizScore: score, totalQuestions, correctAnswers, wrongAnswers });
        }

        await progress.save();
        res.json({ success: true, message: "Quiz results saved", progress });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Fetch user quiz results
exports.getQuizResults = async (req, res) => {
    try {
        const { userId, courseId } = req.params;
        const progress = await Progress.findOne({ userId, courseId }).populate("completedTopics.topicId");

        if (!progress) {
            return res.json({ message: "No progress found" });
        }

        res.json(progress.completedTopics);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
