const express = require('express');
const router = express.Router();
const Feedback = require('./feedbackModel');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();
    
    res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(" Feedback Submission Error:", error);
    res.status(500).json({ error: 'Server error while submitting feedback' });
  }
});


router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error(" Error fetching feedback:", error);
    res.status(500).json({ error: 'Server error while fetching feedback' });
  }
});

module.exports = router;
