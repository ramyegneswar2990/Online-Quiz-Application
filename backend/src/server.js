const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path"); // Moved path import here to be available for dotenv.config()

dotenv.config({ path: path.join(__dirname, "../.env") });
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

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

app.use(express.json());

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
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
