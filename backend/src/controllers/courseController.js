 
const Course = require("../models/Course");

const createCourse = async (req, res) => {
    const { name, description } = req.body;

    try {
        const course = new Course({ name, description });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { createCourse, getAllCourses };
