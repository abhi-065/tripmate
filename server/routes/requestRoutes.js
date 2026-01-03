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
  if (!trip) {
    return res.status(404).json({ message: "Trip not found" });
  }

  // prevent duplicate requests
  const exists = await Request.findOne({
    trip: tripId,
    fromUser: req.user.id
  });

  if (exists) {
    return res.status(400).json({ message: "Request already sent" });
  }

  const request = await Request.create({
    trip: tripId,
    fromUser: req.user.id,
    toUser: trip.user,
    status: "pending"
  });

  res.json(request);
});

/* =========================
   GET ALL MY REQUESTS
   (incoming + sent)
========================= */
router.get("/", authMiddleware, async (req, res) => {
  const requests = await Request.find({
    $or: [
      { fromUser: req.user.id },
      { toUser: req.user.id }
    ]
  })
    .populate("fromUser", "name email")
    .populate("toUser", "name email")
    .populate("trip", "destination travelDate budget");

  res.json(requests);
});

/* =========================
   ACCEPT REQUEST
========================= */
router.put("/:id/accept", authMiddleware, async (req, res) => {
  const request = await Request.findById(req.params.id);
  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  request.status = "accepted";
  await request.save();

  res.json({ message: "Request accepted" });
});

/* =========================
   REJECT REQUEST
========================= */
router.put("/:id/reject", authMiddleware, async (req, res) => {
  const request = await Request.findById(req.params.id);
  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  request.status = "rejected";
  await request.save();

  res.json({ message: "Request rejected" });
});

export default router;
