const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");

dotenv.config({ path: path.join(__dirname, "../.env") });

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
const allowedOrigins = process.env.CORS_WHITELIST ? process.env.CORS_WHITELIST.split(',') : ['http://localhost:3000', 'http://localhost:5173'];

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
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
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

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
        res.status(200).send("Backend is running. Frontend build not found. Run 'npm run build' in the root.");
    });
}

// Start Server
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
