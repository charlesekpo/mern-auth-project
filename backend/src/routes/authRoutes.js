const express = require('express');
const {protect, authorize} = require('../middleware/authMiddleware.js');

const {register, login, profile, logout, createAdmin, deleteUser, getAllUser} = require('../controllers/authController.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, profile);
router.post('/logout', logout);
router.post('/create-admin', createAdmin);
router.get('/all-user', protect, authorize('admin'), getAllUser);
router.delete('/delete-user/:id', protect, authorize('admin'), deleteUser);


module.exports = router;