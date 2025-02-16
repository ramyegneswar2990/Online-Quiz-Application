const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Ensure your DB connection is set up
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const { authMiddleware, adminMiddleware } = require("./middlewares/authMiddleware");
const corsMiddleware = require("./middlewares/corsMiddleware");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// Routes (Import them when ready)
app.use("/api/auth", require("./routes/authRoutes")); 
// app.use("/api/courses",require("./routes/courseRoutes"));
// app.use("/api/quiz", require("./routes/quizRoutes"));

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
