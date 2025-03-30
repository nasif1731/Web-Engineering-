const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const auth = require('../middleware/auth');

// Wishlist routes require auth
router.get('/:studentId', auth, wishlistController.getWishlist);
router.post('/add', auth, wishlistController.addToWishlist);
router.post('/remove', auth, wishlistController.removeFromWishlist);

module.exports = router;
