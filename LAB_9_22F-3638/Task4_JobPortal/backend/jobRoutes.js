const express = require('express');
const router = express.Router();
const Job = require('./jobModel');
const Application = require('./applicationModel');

// ✅ GET /api/jobs → Fetch all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// ✅ POST /api/apply → Submit an application
router.post('/apply', async (req, res) => {
  try {
    const { jobId, name, email, resume } = req.body;
    const application = new Application({ jobId, name, email, resume });
    await application.save();

    res.status(201).json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// ✅ GET /api/applicants/:jobId → Fetch applicants for a job
router.get('/applicants/:jobId', async (req, res) => {
  try {
    const applicants = await Application.find({ jobId: req.params.jobId });
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applicants' });
  }
});

module.exports = router;
