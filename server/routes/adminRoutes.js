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
  const users = await User.find().select("-password");
  res.json(users);
});

/* =====================
   DELETE USER
===================== */
router.delete("/user/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  await Trip.deleteMany({ user: req.params.id });

  res.json({ message: "User and their trips deleted" });
});

/* =====================
   DELETE ANY TRIP
===================== */
router.delete("/trip/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await Trip.findByIdAndDelete(req.params.id);
  res.json({ message: "Trip deleted by admin" });
});

export default router;
