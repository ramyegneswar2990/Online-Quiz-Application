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

// Mongoose Connection Pattern for Serverless
let cachedPromise = null;

const connectToDatabase = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing in environment variables");
    }

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!cachedPromise) {
        cachedPromise = mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            bufferCommands: false
        }).then((mongoose) => {
            console.log("MongoDB connected successfully");
            return mongoose;
        }).catch((err) => {
            console.error("MongoDB connection error:", err);
            cachedPromise = null;
            throw err;
        });
    }

    return cachedPromise;
};

// Middleware: Ensure DB is connected for all API routes
app.use(async (req, res, next) => {
    if (req.path.startsWith('/api')) {
        try {
            await connectToDatabase();
        } catch (error) {
            console.error("Critical DB Connection Failure:", error);
        }
    }
    next();
});

// Test endpoint
app.get("/api/ping", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        database: {
            status: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
            readyState: mongoose.connection.readyState,
            readyStateText: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
        },
        env: {
            hasMongoUri: !!process.env.MONGO_URI,
            mongoUriPreview: process.env.MONGO_URI ? `${process.env.MONGO_URI.substring(0, 20)}...` : 'not set',
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
