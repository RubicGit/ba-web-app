// packages
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  assignedDate: { type: Date, required: true },
  answer: { type: String, default: "" },
  mark: { type: Number, default: 0 },
  maxMark: { type: Number, default: 0 },
  isSubmitted: { type: Boolean, default: false },
  isMarked: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["not-started", "pending", "completed"],
    default: "not-started",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
});

const eventModel = mongoose.model.event || mongoose.model("event", eventSchema);

export default eventModel;
