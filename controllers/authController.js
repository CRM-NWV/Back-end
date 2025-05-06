const Director = require('../models/Director');
const jwt = require('jsonwebtoken');

// Login funksiyasi
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const director = await Director.findOne({ email });
        if (!director) return res.status(400).json({ message: 'Email yoki parol xato' });
        const isMatch = await director.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Email yoki parol xato' });
        const token = jwt.sign({ id: director._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: error.message });
    }
};

// Register funksiyasi
const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingDirector = await Director.findOne({ email });
        if (existingDirector) return res.status(400).json({ message: 'Bu email allaqachon ro‘yxatdan o‘tgan' });
        const director = new Director({ email, password });
        await director.save();
        const token = jwt.sign({ id: director._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'Direktor muvaffaqiyatli ro‘yxatdan o‘tdi', token });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: error.message });
    }
};

// Profilni yangilash funksiyasi
const updateProfile = async (req, res) => {
    const { firstName, lastName, phoneNumber, password, email, role } = req.body;
    const directorId = req.director.id;
    try {
        const director = await Director.findById(directorId);
        if (!director) return res.status(404).json({ message: 'Direktor topilmadi' });
        if (email) {
            const existingEmail = await Director.findOne({ email, _id: { $ne: directorId } });
            if (existingEmail) return res.status(400).json({ message: 'Bu email allaqachon ro‘yxatdan o‘tgan' });
            director.email = email;
        }
        if (firstName) director.firstName = firstName;
        if (lastName) director.lastName = lastName;
        if (phoneNumber) director.phoneNumber = phoneNumber;
        if (password) director.password = password;
        if (role) director.role = role;
        await director.save();
        res.status(200).json({ message: 'Profil muvaffaqiyatli yangilandi', director });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: error.message });
    }
};

// Profil ma'lumotlarini olish funksiyasi
const getProfile = async (req, res) => {
    const directorId = req.director.id;
    try {
        const director = await Director.findById(directorId).select('-password');
        if (!director) return res.status(404).json({ message: 'Direktor topilmadi' });
        res.status(200).json(director);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: error.message });
    }
};

// Profilni o‘chirish funksiyasi
const deleteProfile = async (req, res) => {
    const directorId = req.director.id;
    try {
        const director = await Director.findByIdAndDelete(directorId);
        if (!director) return res.status(404).json({ message: 'Direktor topilmadi' });
        res.status(200).json({ message: 'Profil muvaffaqiyatli o‘chirildi' });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: error.message });
    }
};

module.exports = { login, register, updateProfile, getProfile, deleteProfile };