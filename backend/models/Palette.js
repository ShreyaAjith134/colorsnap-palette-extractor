import mongoose from "mongoose";

const paletteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  note: { type: String },
  colors: { type: [String], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

const Palette = mongoose.model("Palette", paletteSchema);

export default Palette;
