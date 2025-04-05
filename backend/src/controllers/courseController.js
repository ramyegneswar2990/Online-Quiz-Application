// const Course = require("../models/Course");

// // 📌 Get all courses
// const getCourses = async (req, res) => {
//   try {
//     const courses = await Course.find({}, { name: 1, _id: 0 }); // Fetch only course names
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ error: `Server error: ${error.message}` });
//   }
// };

// // 📌 Get topics by course name
// const getTopicsByCourse = async (req, res) => {
//   try {
//     const courseName = req.params.courseName;
    
//     // Find the course document based on the course name
//     const course = await Course.findOne({ name: courseName });

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     return res.json(course.topics);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = { getCourses, getTopicsByCourse };

const fs = require("fs");
const path = require("path");

// 📌 Load Courses from JSON File
const getCoursesFromFile = () => {
    const filePath = path.join(__dirname, "../new course db.json"); // Ensure this path is correct
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const parsedData = JSON.parse(data);
        return Array.isArray(parsedData) ? parsedData : parsedData.courses || [];
    } catch (error) {
        console.error("Error reading JSON file:", error);
        return [];
    }
};

// 📌 Get All Courses
const getAllCourses = (req, res) => {
    const courses = getCoursesFromFile();
    res.json(courses);
};

// 📌 Get Topics by Course Name
const getTopicsByCourse = (req, res) => {
    const courseName = req.params.courseName.toLowerCase();
    const courses = getCoursesFromFile();

    if (!Array.isArray(courses)) {
        return res.status(500).json({ message: "Invalid courses data format" });
    }

    // Find course
    const course = courses.find((c) => c.name.toLowerCase() === courseName);

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    res.json(course.topics || []);
};
const getQuestionsByTopic = (req, res) => {
    const courseName = req.params.courseName.toLowerCase();
    const topicId = parseInt(req.params.topicId, 10); // Convert topicId to a number
    const courses = getCoursesFromFile();

    if (!Array.isArray(courses)) {
        return res.status(500).json({ message: "Invalid courses data format" });
    }

    // Find the course
    const course = courses.find((c) => c.name.toLowerCase() === courseName);

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    // Find the topic
    const topic = course.topics.find((t) => t.id === topicId);

    if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
    }

    res.json(topic.questions || []);
};


// 📌 Export Controllers
module.exports = { getAllCourses, getTopicsByCourse ,getQuestionsByTopic};
