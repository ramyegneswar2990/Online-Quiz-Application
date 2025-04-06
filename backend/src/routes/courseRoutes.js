const express = require("express");
const { getAllCourses, getTopicsByCourse ,getQuestionsByTopic} = require("../controllers/courseController");

const router = express.Router();

// 📌 Routes
router.get("/", getAllCourses);
router.get("/topics/:courseName", getTopicsByCourse);
router.get("/questions/:courseName/:topicId", getQuestionsByTopic);


module.exports = router;
