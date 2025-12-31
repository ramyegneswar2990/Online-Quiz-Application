const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return;
    }

    try {
        if (!process.env.MONGO_URI) {
            console.error("MONGO_URI is not defined in environment variables");
            return; // Don't crash the server, just skip DB connection
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);

        isConnected = !!conn.connections[0].readyState;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        // Don't crash in production, just log the error
        if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
            process.exit(1);
        }
    }
};

module.exports = connectDB;
