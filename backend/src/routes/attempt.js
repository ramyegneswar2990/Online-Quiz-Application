const express = require("express");
const { submitAttempt, getAttempts } = require("../controllers/attemptController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:quizId", protect, submitAttempt); // Users submit quiz attempts
router.get("/:userId", protect, getAttempts); // Users can view their attempts

module.exports = router;
