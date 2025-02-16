 const express= require ("express");
 const { getAllCourses , createCourse , updateCourse , deleteCourse } = require("../controllers/courseController");
 const{protect,adminProtect} = require("../middlewares/authMiddleware");

 const router = express.Router();

 router.get("/",protect,getAllCourses);
 router.post("/",protect,adminProtect,createCourse);
 router.put("/:id",protect,adminProtect,updateCourse);
 router.delete("/:id",protect,adminProtect,deleteCourse);

 module.exports = router;
