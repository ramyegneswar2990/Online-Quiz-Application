const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const Course = require("../models/Course");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const migrate = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for migration...");

        const filePath = path.join(__dirname, "../new course db.json");
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        const courses = Array.isArray(data) ? data : data.courses || [];

        console.log(`Found ${courses.length} courses in JSON file.`);

        // Clear existing courses to avoid duplicates during migration
        await Course.deleteMany({});
        console.log("Cleared existing courses in database.");

        // Insert courses
        await Course.insertMany(courses);
        console.log("Data migration completed successfully!");

        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
};

migrate();
