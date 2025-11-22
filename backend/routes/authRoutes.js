import express from "express";
import User from "../models/User.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(200).json({
      message: "Signup successful!",
      userId: newUser._id   // ⭐ return userId
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Check credentials
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful!",
      userId: user._id   // ⭐ return userId
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
});

export default router;
