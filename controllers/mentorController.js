const Mentor = require('../models/Mentor');

// Mentor qo‘shish
const addMentor = async (req, res) => {
    const { firstName, lastName, middleName, email, phoneNumber, postalAddress, birthDate, subject, photo, address, status, salary, startDate, endDate, paymentType } = req.body;
    const createdBy = req.director.id;
    try {
        const existingMentor = await Mentor.findOne({ email });
        if (existingMentor) return res.status(400).json({ message: 'Bu email allaqachon ro‘yxatdan o‘tgan' });
        const mentor = new Mentor({ firstName, lastName, middleName, email, phoneNumber, postalAddress, birthDate, subject, photo, address, status, salary, startDate, endDate, paymentType, createdBy });
        await mentor.save();
        res.status(201).json({ message: 'Mentor muvaffaqiyatli qo‘shildi', mentor });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: error.message });
    }
};

// Barcha mentorlarni olish
const getMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find().populate('createdBy', 'email');
        res.status(200).json(mentors);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: error.message });
    }
};

// Bitta mentorni olish
const getMentorById = async (req, res) => {
    const { id } = req.params;
    try {
        const mentor = await Mentor.findById(id).populate('createdBy', 'email');
        if (!mentor) return res.status(404).json({ message: 'Mentor topilmadi' });
        res.status(200).json(mentor);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: error.message });
    }
};

// Mentorni yangilash
const updateMentor = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, middleName, email, phoneNumber, postalAddress, birthDate, subject, photo, address, status, salary, startDate, endDate, paymentType } = req.body;
    try {
        const mentor = await Mentor.findById(id);
        if (!mentor) return res.status(404).json({ message: 'Mentor topilmadi' });
        if (email && email !== mentor.email) {
            const existingMentor = await Mentor.findOne({ email });
            if (existingMentor) return res.status(400).json({ message: 'Bu email allaqachon ro‘yxatdan o‘tgan' });
        }
        if (firstName) mentor.firstName = firstName;
        if (lastName) mentor.lastName = lastName;
        if (middleName) mentor.middleName = middleName;
        if (phoneNumber) mentor.phoneNumber = phoneNumber;
        if (postalAddress) mentor.postalAddress = postalAddress;
        if (birthDate) mentor.birthDate = birthDate;
        if (subject) mentor.subject = subject;
        if (photo) mentor.photo = photo;
        if (address) mentor.address = address;
        if (status) mentor.status = status;
        if (salary) mentor.salary = salary;
        if (startDate) mentor.startDate = startDate;
        if (endDate) mentor.endDate = endDate;
        if (paymentType) mentor.paymentType = paymentType;
        await mentor.save();
        res.status(200).json({ message: 'Mentor muvaffaqiyatli yangilandi', mentor });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: error.message });
    }
};

// Mentorni o‘chirish
const deleteMentor = async (req, res) => {
    const { id } = req.params;
    try {
        const mentor = await Mentor.findByIdAndDelete(id);
        if (!mentor) return res.status(404).json({ message: 'Mentor topilmadi' });
        res.status(200).json({ message: 'Mentor muvaffaqiyatli o‘chirildi' });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: error.message });
    }
};

// Mentorlarni qidirish
const searchMentors = async (req, res) => {
    const { query } = req.query;
    try {
        const mentors = await Mentor.find({
            $or: [
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } },
                { middleName: { $regex: query, $options: 'i' } },
                { phoneNumber: { $regex: query, $options: 'i' } },
            ],
        }).populate('createdBy', 'email');
        if (mentors.length === 0) return res.status(404).json({ message: 'Hech qanday mentor topilmadi' });
        res.status(200).json(mentors);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: error.message });
    }
};

module.exports = { addMentor, getMentors, getMentorById, updateMentor, deleteMentor, searchMentors };