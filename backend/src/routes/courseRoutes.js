//  const express= require ("express");
//  const { getCourses , getTopicsByCourse , updateCourse , deleteCourse } = require("../controllers/courseController");
//  const{protect,adminProtect} = require("../middlewares/authMiddleware");

//  const router = express.Router();

//  //router.get("/",protect,getAllCourses);
//  //router.post("/",protect,adminProtect,createCourse);
//  //router.put("/:id",protect,adminProtect,updateCourse);
//  //router.delete("/:id",protect,adminProtect,deleteCourse);
//  router.get("/", getCourses);
//  router.get("/topics/:courseName", getTopicsByCourse);
//  //  router.get("/Courses:id",Topics);
//  module.exports = router;const express = require("express");
const express = require("express");
const { getAllCourses, getTopicsByCourse ,getQuestionsByTopic} = require("../controllers/courseController");

const router = express.Router();

// 📌 Routes
router.get("/", getAllCourses);
router.get("/topics/:courseName", getTopicsByCourse);
router.get("/questions/:courseName/:topicId", getQuestionsByTopic);


module.exports = router;
