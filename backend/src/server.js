const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.join(__dirname, "../.env") });
}

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection Middleware (Ensuring connection for serverless)
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "Database connection failed", error: error.message });
    }
});

// CORS configuration
const allowedOrigins = process.env.CORS_WHITELIST ? process.env.CORS_WHITELIST.split(',') : [];

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow if no origin (same-origin, mobile, curl) OR if it's in whitelist 
        // OR if whitelist is empty (allow all during initial setup)
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.length === 0) {
            return callback(null, true);
        }

        console.error(`CORS Blocked for origin: ${origin}`);
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP if it interferes with frontend or if you configure it manually
}));
app.use(compression());
app.use(express.json());

// Health Check
app.get("/api/ping", (req, res) => res.status(200).json({
    status: "ok",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    env: {
        hasMongo: !!process.env.MONGO_URI,
        hasJwt: !!process.env.JWT_SECRET,
        nodeEnv: process.env.NODE_ENV
    }
}));

// API Routes
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/result", require("./routes/resultRoutes"));
app.use("/api/leaderboard", require("./routes/leaderboard"));
app.use("/api", require("./routes/certificateRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api", require("./routes/analyticsRoutes"));

// Serve Frontend
const frontendPath = path.join(__dirname, "../../frontned/dist");
const fs = require("fs");

if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
} else {
    app.get("*", (req, res) => {
        res.status(200).send("Backend is running. Frontend build not found.");
    });
}

// Global Error Handler (UNMASKED for debugging)
app.use((err, req, res, next) => {
    console.error("CRITICAL ERROR:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: err.toString(),
        stack: err.stack
    });
});

// Start Server
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
