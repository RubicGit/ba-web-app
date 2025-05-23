// packages
import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

const classModel = mongoose.model.class || mongoose.model("class", classSchema);

export default classModel;
