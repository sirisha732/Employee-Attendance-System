const router = require("express").Router();
const Attendance = require("../models/Attendance");
const User = require("../models/User");
const auth = require("../middleware/auth");

router.get("/employee", auth, async (req, res) => {
  const records = await Attendance.find({ userId: req.user.id });
  res.json(records);
});

router.get("/manager", auth, async (req, res) => {
  const totalEmployees = await User.countDocuments();
  const today = new Date().toISOString().slice(0,10);
  const present = await Attendance.countDocuments({ date: today });
  res.json({ totalEmployees, present });
});

module.exports = router;
