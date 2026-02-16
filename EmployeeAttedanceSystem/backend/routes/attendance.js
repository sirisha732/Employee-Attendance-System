const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const User = require("../models/User");
const auth = require("../middleware/auth");

/*
====================================
EMPLOYEE APIs
====================================
*/

/**
 * CHECK IN
 * POST /api/attendance/checkin
 */
router.post("/checkin", auth, async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    // Prevent multiple check-ins
    const existing = await Attendance.findOne({
      userId: req.user.id,
      date: today
    });

    if (existing) {
      return res.status(400).json({ msg: "Already checked in today" });
    }

    const record = await Attendance.create({
      userId: req.user.id,
      date: today,
      checkInTime: new Date().toLocaleTimeString(),
      status: "present"
    });

    res.json(record);
  } catch (err) {
    res.status(500).json({ msg: "Check-in failed" });
  }
});

/**
 * CHECK OUT
 * POST /api/attendance/checkout
 */
router.post("/checkout", auth, async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const record = await Attendance.findOne({
      userId: req.user.id,
      date: today
    });

    if (!record) {
      return res.status(400).json({ msg: "Check-in required first" });
    }

    record.checkOutTime = new Date().toLocaleTimeString();
    record.totalHours = 8; // sample logic
    await record.save();

    res.json(record);
  } catch (err) {
    res.status(500).json({ msg: "Check-out failed" });
  }
});

/**
 * MY ATTENDANCE HISTORY
 * GET /api/attendance/my-history
 */
router.get("/my-history", auth, async (req, res) => {
  try {
    const data = await Attendance.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(data);
  } catch {
    res.status(500).json({ msg: "Failed to fetch history" });
  }
});

/**
 * TODAY STATUS
 * GET /api/attendance/today
 */
router.get("/today", auth, async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const record = await Attendance.findOne({
    userId: req.user.id,
    date: today
  });
  res.json(record || { status: "Not Checked In" });
});

/**
 * MONTHLY SUMMARY
 * GET /api/attendance/my-summary
 */
router.get("/my-summary", auth, async (req, res) => {
  try {
    const month = new Date().toISOString().slice(0, 7); // YYYY-MM

    const records = await Attendance.find({
      userId: req.user.id,
      date: { $regex: month }
    });

    let present = 0, absent = 0, late = 0, hours = 0;

    records.forEach(r => {
      if (r.status === "present") present++;
      if (r.status === "absent") absent++;
      if (r.status === "late") late++;
      hours += r.totalHours || 0;
    });

    res.json({ present, absent, late, hours });
  } catch {
    res.status(500).json({ msg: "Failed to fetch summary" });
  }
});

/*
====================================
MANAGER APIs
====================================
*/

/**
 * ALL EMPLOYEES ATTENDANCE
 * GET /api/attendance/all
 */
router.get("/all", auth, async (req, res) => {
  if (req.user.role !== "manager") {
    return res.status(403).json({ msg: "Access denied" });
  }

  const data = await Attendance.find().populate("userId", "name department");
  res.json(data);
});

/**
 * SPECIFIC EMPLOYEE ATTENDANCE
 * GET /api/attendance/employee/:id
 */
router.get("/employee/:id", auth, async (req, res) => {
  if (req.user.role !== "manager") {
    return res.status(403).json({ msg: "Access denied" });
  }

  const data = await Attendance.find({ userId: req.params.id });
  res.json(data);
});

/**
 * TEAM SUMMARY
 * GET /api/attendance/summary
 */
router.get("/summary", auth, async (req, res) => {
  if (req.user.role !== "manager") {
    return res.status(403).json({ msg: "Access denied" });
  }

  const today = new Date().toISOString().slice(0, 10);

  const present = await Attendance.countDocuments({ date: today });
  const totalEmployees = await User.countDocuments();

  res.json({
    totalEmployees,
    present,
    absent: totalEmployees - present
  });
});

/**
 * WHO IS PRESENT TODAY
 * GET /api/attendance/today-status
 */
router.get("/today-status", auth, async (req, res) => {
  if (req.user.role !== "manager") {
    return res.status(403).json({ msg: "Access denied" });
  }

  const today = new Date().toISOString().slice(0, 10);
  const data = await Attendance.find({ date: today })
    .populate("userId", "name department");

  res.json(data);
});

module.exports = router;

