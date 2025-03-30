const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verificationController');
const auth = require('../middleware/auth');

// Admin verification actions (protected)
router.post('/', auth, verificationController.createVerificationRequest);
router.get('/', auth, verificationController.getAllVerificationRequests);
router.put('/:id', auth, verificationController.updateVerificationStatus);

module.exports = router;
