const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  date: String,
  checkInTime: String,
  checkOutTime: String,
  status: String,
  totalHours: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
