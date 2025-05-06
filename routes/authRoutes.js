const express = require('express');
const router = express.Router();
const { login, register, updateProfile, getProfile, deleteProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/register', register);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.delete('/profile', authMiddleware, deleteProfile); // DELETE qo‘shildi

module.exports = router;