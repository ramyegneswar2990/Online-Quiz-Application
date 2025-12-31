const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;

// Simple CORS - allow all origins for now
app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/api/ping", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        env: {
            hasMongoUri: !!process.env.MONGO_URI,
            hasJwtSecret: !!process.env.JWT_SECRET,
            nodeEnv: process.env.NODE_ENV
        }
    });
});

// API Routes
try {
    app.use("/api/courses", require("./routes/courseRoutes"));
    app.use("/api/auth", require("./routes/authRoutes"));
    app.use("/api/result", require("./routes/resultRoutes"));
    app.use("/api/leaderboard", require("./routes/leaderboard"));
    app.use("/api", require("./routes/certificateRoutes"));
    app.use("/api/admin", require("./routes/adminRoutes"));
    app.use("/api", require("./routes/analyticsRoutes"));
} catch (error) {
    console.error("Error loading routes:", error);
}

// Connect to database (non-blocking)
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.error("MongoDB connection error:", err.message));
}

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// Start server (only in non-serverless environment)
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
