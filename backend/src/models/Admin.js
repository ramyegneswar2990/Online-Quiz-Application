const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' },
  isAdmin: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);