import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  resetToken: String,
  resetTokenExpiry: Date,

  isAdmin: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("User", userSchema);
