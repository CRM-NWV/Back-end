const express = require('express');
const router = express.Router();
const { addMentor, getMentors, getMentorById, updateMentor, deleteMentor, searchMentors } = require('../controllers/mentorController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addMentor);
router.get('/', authMiddleware, getMentors);
router.get('/search', authMiddleware, searchMentors);
router.get('/:id', authMiddleware, getMentorById);
router.put('/:id', authMiddleware, updateMentor); // Yangilash
router.delete('/:id', authMiddleware, deleteMentor); // O‘chirish

module.exports = router;