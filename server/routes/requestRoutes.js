import express from "express";
import Request from "../models/Request.js";
import Trip from "../models/Trip.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   SEND REQUEST
========================= */
router.post("/send", authMiddleware, async (req, res) => {
  const { tripId } = req.body;

  const trip = await Trip.findById(tripId);
  if (!trip) return res.status(404).json({ message: "Trip not found" });

  const request = await Request.create({
    trip: tripId,
    fromUser: req.user.id,
    toUser: trip.user
  });

  res.json({ message: "Request sent" });
});

/* =========================
   GET MY REQUESTS
========================= */
router.get("/my", authMiddleware, async (req, res) => {
  const requests = await Request.find({ toUser: req.user.id })
    .populate("fromUser", "name email")
    .populate("trip");

  res.json(requests);
});

/* =========================
   ACCEPT / REJECT REQUEST
========================= */
router.put("/:id", authMiddleware, async (req, res) => {
  const { status } = req.body;

  const request = await Request.findById(req.params.id);
  if (!request) return res.status(404).json({ message: "Not found" });

  request.status = status;
  await request.save();

  res.json({ message: "Request updated" });
});

export default router;
