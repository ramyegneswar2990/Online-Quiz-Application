const express = require("express");
const { getQuestions, createQuestion, updateQuestion, deleteQuestion } = require("../controllers/questionController");
const { protect, adminProtect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:quizId", protect, getQuestions);
router.post("/:quizId", protect, adminProtect, createQuestion);
router.put("/:id", protect, adminProtect, updateQuestion);
router.delete("/:id", protect, adminProtect, deleteQuestion);

module.exports = router;
