// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db"); // Ensure your DB connection is set up
// const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
// const { authMiddleware, adminMiddleware } = require("./middlewares/authMiddleware");
// const corsMiddleware = require("./middlewares/corsMiddleware");

// dotenv.config();
// connectDB();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(corsMiddleware);

// // Routes (Import them when ready)
// app.use("/api/auth", require("./routes/authRoutes")); 
// app.use("/api/courses",require("./routes/courseRoutes"));
// // app.use("/api/quiz", require("./routes/quizRoutes"));

// // Error Handling Middleware
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// // });
// const express = require("express");
//  const dotenv = require("dotenv");
//  const connectDB = require("./config/db");
// const fs = require("fs");
// const path = require("path");

// const router = express.Router();
// dotenv.config();
// connectDB();

// // 📌 Load Courses from JSON File (Same Folder as server.js)
// const getCoursesFromFile = () => {
//     const filePath = path.join(__dirname, "../new course db.json"); // Updated Path
//     try {
//         const data = fs.readFileSync(filePath, "utf8");
//         return JSON.parse(data);
//     } catch (error) {
//         console.error("Error reading JSON file:", error);
//         return [];
//     }
// };

// // 📌 Get all courses
// router.get("/", (req, res) => {
//     const courses = getCoursesFromFile();
//     res.json(courses);
// });

// // 📌 Get topics by course name
// router.get("/topics/:courseName", (req, res) => {
//     const courseName = req.params.courseName.toLowerCase();
//     const courses = getCoursesFromFile();
    
//     // Find course
//     const course = courses.find((c) => c.name.toLowerCase() === courseName);

//     if (!course) {
//         return res.status(404).json({ message: "Course not found" });
//     }

//     res.json(course.topics || []);
// });

// module.exports = router;
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
//const fs = require("fs");

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/courses", require("./routes/courseRoutes")); 
app.use("/api/auth", require("./routes/authRoutes")); 
app.use("/api/result", require("./routes/resultRoutes"));

// app.get("/", (req, res) => {
//     res.send("Server is running!");
// });

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
