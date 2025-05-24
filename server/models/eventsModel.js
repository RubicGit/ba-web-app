// packages
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  ethDate: { type: Date, required: true },
  description: { type: String },
  coverUrl: { type: String, required: true },
  global: { type: Boolean, default: false },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const eventModel =
  mongoose.models.event || mongoose.model("event", eventSchema);

export default eventModel;
