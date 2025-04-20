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

const saveCoursesToFile = (courses) => {
    const filePath = path.join(__dirname, "../new course db.json");
    try {
        fs.writeFileSync(filePath, JSON.stringify({ courses }, null, 2));
    } catch (error) {
        console.error("Error writing JSON file:", error);
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

const addCourse = (req, res) => {
    const courses = getCoursesFromFile();
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Course name is required" });
    }

    // 🔍 Check if course already exists (case-insensitive)
    const existingCourse = courses.find(
        (course) => course.name.toLowerCase() === name.toLowerCase()
    );

    if (existingCourse) {
        return res.status(409).json({ message: "Course already exists" });
    }

    const newCourse = {
        id: Date.now(),
        name,
        topics: []
    };

    courses.push(newCourse);
    saveCoursesToFile(courses);

    res.status(201).json({ message: "Course added successfully", course: newCourse });
};

const addTopicToCourse = (req, res) => {
    const { courseName } = req.params;
    const { name } = req.body;

    const courses = getCoursesFromFile();
    const course = courses.find(c => c.name.toLowerCase() === courseName.toLowerCase());

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    // 🔍 Check if the topic already exists (case-insensitive)
    const existingTopic = course.topics.find(
        (topic) => topic.name.toLowerCase() === name.toLowerCase()
    );

    if (existingTopic) {
        return res.status(409).json({ message: "Topic already exists in this course" });
    }

    const newTopic = {
        id: Date.now(),
        name,
        questions: []
    };

    course.topics.push(newTopic);
    saveCoursesToFile(courses);

    res.status(201).json({ message: "Topic added", topic: newTopic });
};

const addQuestionToTopic = (req, res) => {
    const { courseName, topicId } = req.params;
    const { question, options, answer } = req.body;

    const courses = getCoursesFromFile();
    const course = courses.find(c => c.name.toLowerCase() === courseName.toLowerCase());

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    const topic = course.topics.find(t => t.id === parseInt(topicId));
    if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
    }

    // 🔍 Check if the question already exists in the topic (case-insensitive)
    const existingQuestion = topic.questions.find(
        (q) => q.question.toLowerCase() === question.toLowerCase()
    );

    if (existingQuestion) {
        return res.status(409).json({ message: "This question already exists in this topic" });
    }

    const newQuestion = {
        id: Date.now(),
        question,
        options,
        answer
    };

    topic.questions.push(newQuestion);
    saveCoursesToFile(courses);

    res.status(201).json({ message: "Question added", question: newQuestion });
};

module.exports = { getAllCourses, getTopicsByCourse ,getQuestionsByTopic,addCourse,addTopicToCourse,addQuestionToTopic};
