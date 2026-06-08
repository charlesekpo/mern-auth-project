const express = require('express');
const {protect, authorize} = require('../middleware/authMiddleware.js');

const {register, login, profile, logout, createAdmin, deleteUser} = require('../controllers/authController.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, profile);
router.delete('/delete-user/:id', protect, authorize('admin'), deleteUser);
router.post('/logout', logout);
router.post('/create-admin', createAdmin);

module.exports = router;