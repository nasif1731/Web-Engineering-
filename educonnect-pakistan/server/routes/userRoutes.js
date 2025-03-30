const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/profile/:id', auth,userController.getUserProfile);
router.put('/profile/:id', auth,userController.updateUserProfile);
router.get('/tutors', userController.getAllTutors);
router.get('/tutors/:id', userController.getTutorById);


module.exports = router;
