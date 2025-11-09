import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    testnme: { type: String, required: true },
    result: { type: Number, required: true },
    Date: { type: Date, default: Date.now },
    doctorNote: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Test", userSchema);
