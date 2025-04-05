const express = require("express");
const router = express.Router();
const progressController = require("../controllers/ProgressController");

router.post("/submit-quiz", progressController.submitQuiz);
router.get("/quiz-results/:userId/:courseId", progressController.getQuizResults);

module.exports = router;
