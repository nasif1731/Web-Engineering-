const express = require('express');
const router = express.Router();
const Student = require('./Student');

router.get('/check-email/:email', async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.params.email });
    res.json({ exists: !!student });
  } catch (error) {
    res.status(500).json({ error: 'Server error while checking email' });
  }
});


router.post('/register', async (req, res) => {
  try {
    const { name, email, password, department } = req.body;
    
    const newStudent = new Student({ name, email, password, department });
    await newStudent.save();
    
    res.status(201).json({ success: true, message: 'Student registered successfully' });
  } catch (error) {
    res.status(500).json({ error: ' Server error during registration' });
  }
});

module.exports = router;
