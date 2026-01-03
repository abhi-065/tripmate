import express from "express";
import User from "../models/User.js";
import Trip from "../models/Trip.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/* =====================
   GET ALL USERS
===================== */
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/* =====================
   GET ALL TRIPS  ✅ MISSING EARLIER
===================== */
router.get("/trips", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch trips" });
  }
});

/* =====================
   DELETE USER
===================== */
router.delete("/user/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Trip.deleteMany({ user: req.params.id });

    res.json({ message: "User and their trips deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

/* =====================
   DELETE ANY TRIP
===================== */
router.delete("/trip/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: "Trip deleted by admin" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete trip" });
  }
});

export default router;
