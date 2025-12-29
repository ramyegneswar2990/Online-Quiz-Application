const Course = require("../models/Course");

// 📌 Get All Courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Failed to fetch courses" });
    }
};

// 📌 Get Topics by Course Name
const getTopicsByCourse = async (req, res) => {
    try {
        const courseName = req.params.courseName.toLowerCase();
        const course = await Course.findOne({ name: new RegExp(`^${courseName}$`, 'i') });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json(course.topics || []);
    } catch (error) {
        console.error("Error fetching topics:", error);
        res.status(500).json({ message: "Failed to fetch topics" });
    }
};

// 📌 Get Questions by Topic
const getQuestionsByTopic = async (req, res) => {
    try {
        const courseName = req.params.courseName.toLowerCase();
        const topicId = parseInt(req.params.topicId, 10);
        const course = await Course.findOne({ name: new RegExp(`^${courseName}$`, 'i') });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const topic = course.topics.find((t) => t.id === topicId);

        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }

        res.json(topic.questions || []);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: "Failed to fetch questions" });
    }
};

// 📌 Add Course
const addCourse = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Course name is required" });
    }

    try {
        const existingCourse = await Course.findOne({ name: new RegExp(`^${name}$`, 'i') });

        if (existingCourse) {
            return res.status(409).json({ message: "Course already exists" });
        }

        const newCourse = new Course({
            id: Date.now(),
            name,
            topics: []
        });

        await newCourse.save();
        res.status(201).json({ message: "Course added successfully", course: newCourse });
    } catch (error) {
        console.error("Error adding course:", error);
        res.status(500).json({ message: "Failed to add course" });
    }
};

// 📌 Add Topic to Course
const addTopicToCourse = async (req, res) => {
    const { courseName } = req.params;
    const { name } = req.body;

    try {
        const course = await Course.findOne({ name: new RegExp(`^${courseName}$`, 'i') });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

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
        await course.save();

        res.status(201).json({ message: "Topic added", topic: newTopic });
    } catch (error) {
        console.error("Error adding topic:", error);
        res.status(500).json({ message: "Failed to add topic" });
    }
};

// 📌 Add Question to Topic
const addQuestionToTopic = async (req, res) => {
    const { courseName, topicId } = req.params;
    const { question, options, answer } = req.body;

    try {
        const course = await Course.findOne({ name: new RegExp(`^${courseName}$`, 'i') });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const topic = course.topics.find(t => t.id === parseInt(topicId));
        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }

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
        await course.save();

        res.status(201).json({ message: "Question added", question: newQuestion });
    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({ message: "Failed to add question" });
    }
};

// 📌 Update Course Name
const updateCourseName = async (req, res) => {
    const { courseId } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Course name is required" });
    }

    try {
        const course = await Course.findOne({ id: parseInt(courseId) });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (course.name.toLowerCase() === name.toLowerCase()) {
            return res.status(400).json({ message: "The new course name is the same as the current name" });
        }

        course.name = name;
        await course.save();

        res.json({ message: "Course name updated successfully", course });
    } catch (error) {
        console.error("Error updating course name:", error);
        res.status(500).json({ message: "Failed to update course name" });
    }
};

// 📌 Update Topic Name
const updateTopicName = async (req, res) => {
    const { courseName, topicId } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Topic name is required" });
    }

    try {
        const course = await Course.findOne({ name: new RegExp(`^${courseName}$`, 'i') });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const topic = course.topics.find(t => t.id === parseInt(topicId));

        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }

        if (topic.name.toLowerCase() === name.toLowerCase()) {
            return res.status(400).json({ message: "The new topic name is the same as the current name" });
        }

        topic.name = name;
        await course.save();

        res.json({ message: "Topic name updated successfully", topic });
    } catch (error) {
        console.error("Error updating topic name:", error);
        res.status(500).json({ message: "Failed to update topic name" });
    }
};

// 📌 Update Question Content
const updateQuestion = async (req, res) => {
    const { courseName, topicId, questionId } = req.params;
    const { question, options, answer } = req.body;

    if (!question || !options || !answer) {
        return res.status(400).json({ message: "Question, options, and answer are required" });
    }

    try {
        const course = await Course.findOne({ name: new RegExp(`^${courseName}$`, 'i') });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const topic = course.topics.find(t => t.id === parseInt(topicId));
        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }

        const questionToUpdate = topic.questions.find(q => q.id === parseInt(questionId));

        if (!questionToUpdate) {
            return res.status(404).json({ message: "Question not found" });
        }

        if (questionToUpdate.question.toLowerCase() === question.toLowerCase() &&
            JSON.stringify(questionToUpdate.options) === JSON.stringify(options) &&
            questionToUpdate.answer.toLowerCase() === answer.toLowerCase()) {
            return res.status(400).json({ message: "The new question, options, and answer are the same as the current ones" });
        }

        questionToUpdate.question = question;
        questionToUpdate.options = options;
        questionToUpdate.answer = answer;

        await course.save();

        res.json({ message: "Question updated successfully", question: questionToUpdate });
    } catch (error) {
        console.error("Error updating question:", error);
        res.status(500).json({ message: "Failed to update question" });
    }
};

module.exports = {
    getAllCourses,
    getTopicsByCourse,
    getQuestionsByTopic,
    addCourse,
    addTopicToCourse,
    addQuestionToTopic,
    updateCourseName,
    updateTopicName,
    updateQuestion
};
