const express = require("express");
const Event = require("./Event");
const router = express.Router();

// POST Register Event
router.post("/events", async (req, res) => {
  try {
    const { eventName, organizerName, eventDate, latitude, longitude } = req.body;

    if (!eventName || !organizerName || !eventDate || !latitude || !longitude) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEvent = new Event({ eventName, organizerName, eventDate, latitude, longitude });
    await newEvent.save();

    res.status(201).json({ success: true, eventId: newEvent._id });
  } catch (error) {
    res.status(500).json({ error: "Server error while registering event" });
  }
});

module.exports = router;
