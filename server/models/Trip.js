import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    hotel: {
      type: String,
    },

    travelDate: {
      type: String,
    },

    tips: {
      type: String,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
