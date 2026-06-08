const express = require('express');
const {protect} = require('../middleware/authMiddleware.js');

const {register, login, profile, logout} = require('../controllers/authController.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, profile);
router.post('/logout', logout);

module.exports = router;