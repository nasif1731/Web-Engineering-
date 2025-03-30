const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');

// Public route (no auth required)
router.get('/tutor/:tutorId', reviewController.getReviewsByTutor);

// Protected (auth required)
router.post('/', auth, reviewController.createReview);
router.delete('/:id', auth, reviewController.deleteReview);

module.exports = router;
