const express = require("express");
const { getAllCourses, getTopicsByCourse ,getQuestionsByTopic,addCourse,addTopicToCourse,addQuestionToTopic} = require("../controllers/courseController");

const router = express.Router();

// 📌 Routes
router.get("/", getAllCourses);
router.get("/topics/:courseName", getTopicsByCourse);
router.get("/questions/:courseName/:topicId", getQuestionsByTopic);
router.post("/addcourse", addCourse);
router.post("/addcourse/:courseName/topics", addTopicToCourse);
router.post("/addcourse/:courseName/topics/:topicId/questions", addQuestionToTopic);


module.exports = router;
