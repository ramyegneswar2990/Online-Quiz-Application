 const express = require("express");
const { getQuizzes, createQuiz, updateQuiz, deleteQuiz } = require("../controllers/quizController");
const { protect, adminProtect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, getQuizzes);
router.post("/", protect, adminProtect, createQuiz);
router.put("/:id", protect, adminProtect, updateQuiz);
router.delete("/:id", protect, adminProtect, deleteQuiz);

module.exports = router;
