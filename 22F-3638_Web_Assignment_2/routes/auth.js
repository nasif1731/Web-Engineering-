const express = require('express');
const { loginStudent, loginAdmin } = require('../controllers/authController');
const router = express.Router();

router.get('/', (req, res) => res.sendFile('index.html', { root: 'public' }));
router.post('/login/student', loginStudent);
router.post('/login/admin', loginAdmin);

module.exports = router;