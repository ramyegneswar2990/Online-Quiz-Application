const Topic = require("../models/Topic");

const createTopic = async (req, res) => {
    const { name, courseId } = req.body;

    try {
        const topic = new Topic({ name, course: courseId });
        await topic.save();
        res.status(201).json(topic);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getTopicsByCourse = async (req, res) => {
    try {
        const topics = await Topic.find({ course: req.params.courseId });
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { createTopic, getTopicsByCourse };
