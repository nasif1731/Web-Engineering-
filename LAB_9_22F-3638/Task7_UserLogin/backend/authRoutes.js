const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("./User");
const router = express.Router();

// POST Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// GET user by ID
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user data" });
  }
});

module.exports = router;
