const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const auth = require('../middleware/auth');

router.post('/', auth, sessionController.createSession);
router.get('/user/:id', auth, sessionController.getSessionsByUser);
router.put('/:id/status', auth, sessionController.updateSessionStatus);
router.delete('/:id', auth, sessionController.deleteSession);

module.exports = router;
