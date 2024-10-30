import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.error("user not found");
      return res.status(400).json({ message: "user not found"})
    }
    
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("password incorrect");
      return res.status(400).json({ message: "password incorrect" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

export default router
