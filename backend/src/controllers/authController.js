const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, role = 'user' } = req.body;
    console.log("USER_REGISTER_ATTEMPT:", { name, email, hasPassword: !!password, role });

    try {
        // Validate input
        if (!name || !email || !password) {
            console.log("USER_REGISTER_VALIDATION_FAILED: Missing fields");
            return res.status(400).json({ success: false, message: "Name, email, and password are required" });
        }

        // Check if Mongo is connected
        if (mongoose.connection.readyState !== 1) {
            console.error("USER_REGISTER_DB_FAIL: Not connected to MongoDB. State:", mongoose.connection.readyState);
            return res.status(500).json({ success: false, message: "Database connection failed" });
        }

        // Check if user already exists
        console.log("CHECKING_EXISTING_USER...");
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("USER_REGISTER_EXISTING:", email);
            return res.status(400).json({ success: false, message: "User already exists with this email" });
        }

        // Validate role
        const validRoles = ["user", "admin"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ success: false, message: "Invalid role specified" });
        }

        // Hash password
        console.log("HASHING_PASSWORD...");
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        console.log("CREATING_USER_DOC...");
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        console.log("USER_CREATED_SUCCESS:", newUser._id);

        // Generate JWT Token
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: "1h" }
        );

        // Return success response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                token,
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            }
        });
    } catch (error) {
        console.error('CRITICAL_USER_REGISTER_ERROR:', error);
        return res.status(500).json({
            success: false,
            message: "Error during registration",
            error: error.toString(),
            stack: error.stack
        });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: "1h" }
        );

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: "Error during login",
            error: error.message
        });
    }
};

module.exports = { registerUser, loginUser };
