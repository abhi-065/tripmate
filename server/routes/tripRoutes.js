import express from "express";
import Trip from "../models/Trip.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   ADD TRIP
========================= */
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const trip = new Trip({
      destination: req.body.destination,
      travelDate: req.body.travelDate,
      budget: req.body.budget,
      hotel: req.body.hotel,
      user: req.user.id
    });

    await trip.save();
    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ message: "Failed to add trip" });
  }
});

/* =========================
   FIND PARTNER
========================= */
router.get("/match", authMiddleware, async (req, res) => {
  try {
    const { destination, date, budget } = req.query;

    const trips = await Trip.find({
      destination: { $regex: destination, $options: "i" },
      travelDate: date,
      budget: { $lte: Number(budget) }
    }).populate("user", "name");

    res.json(trips);
  } catch (err) {
    console.error("Match error:", err);
    res.status(500).json({ message: "Failed to find partners" });
  }
});


/* =========================
   GET ALL TRIPS
========================= */
router.get("/", async (req, res) => {
  const trips = await Trip.find()
    .populate("user", "name")
    .sort({ createdAt: -1 });

  res.json(trips);
});

/* =========================
   MY TRIPS
========================= */
router.get("/my", authMiddleware, async (req, res) => {
  const trips = await Trip.find({ user: req.user.id });
  res.json(trips);
});

/* =========================
   UPDATE TRIP
========================= */
router.put("/update/:id", authMiddleware, async (req, res) => {
  await Trip.findByIdAndUpdate(
  req.params.id,
  req.body,
  { new: true }
);

  res.json({ message: "Trip updated" });
});

/* =========================
   DELETE TRIP
========================= */
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  await Trip.findByIdAndDelete(req.params.id);
  res.json({ message: "Trip deleted" });
});

export default router;
