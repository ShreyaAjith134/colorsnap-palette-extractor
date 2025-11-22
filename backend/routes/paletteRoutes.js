import express from "express";
import Palette from "../models/Palette.js";
import mongoose from "mongoose";

const router = express.Router();

// SAVE PALETTE
router.post("/", async (req, res) => {
  const { name, note, colors, userId } = req.body;

  const newPalette = new Palette({
    name,
    note,
    colors,
    userId: new mongoose.Types.ObjectId(userId)
  });
  await newPalette.save();
  res.status(201).json("Saved");
  console.log("POST /api/palettes HIT");
  console.log("BODY:", req.body);
});

// GET ALL PALETTES OF A USER
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const palettes = await Palette.find({ userId }).sort({ createdAt: -1 });
  res.json(palettes);
});

export default router;
