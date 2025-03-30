const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middleware/auth');

// Admin reports (protected)
router.post('/', auth, reportController.createReport);
router.get('/', auth, reportController.getReports);

module.exports = router;
