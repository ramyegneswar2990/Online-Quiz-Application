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
        database: {
            status: dbConnectionStatus,
            error: dbConnectionError,
            readyState: mongoose.connection.readyState,
            readyStateText: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
        },
        env: {
            hasMongoUri: !!process.env.MONGO_URI,
            mongoUriPreview: process.env.MONGO_URI ? `${process.env.MONGO_URI.substring(0, 20)}...` : 'not set',
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
let dbConnectionStatus = "not attempted";
let dbConnectionError = null;

if (process.env.MONGO_URI) {
    console.log("Attempting MongoDB connection...");
    mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 15000, // Increased to 15s
        socketTimeoutMS: 45000,
    })
        .then(() => {
            dbConnectionStatus = "connected";
            console.log("MongoDB connected successfully");
        })
        .catch(err => {
            dbConnectionStatus = "failed";
            dbConnectionError = err.message;
            console.error("MongoDB connection error:", err.message);
        });
} else {
    dbConnectionStatus = "no URI provided";
    console.error("MONGO_URI not found in environment variables");
}

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
        dbStatus: dbConnectionStatus,
        dbError: dbConnectionError
    });
});

// Start server (only in non-serverless environment)
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
