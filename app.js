const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const fs = require('fs'); // fs modulini import qilish
const path = require('path');
const cors = require('cors'); // CORS ni import qilish

dotenv.config();
const app = express();

// CORS middleware’ni qo‘shish
app.use(cors()); // Barcha originlardan so‘rov qabul qilinadi

// Agar faqat ma’lum bir origin (masalan, frontend) dan so‘rov qabul qilmoqchi bo‘lsangiz:
// app.use(cors({
//     origin: 'http://localhost:3000', // Frontend manzili (yoki production domeni)
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Ruxsat berilgan metodlar
//     allowedHeaders: ['Content-Type', 'Authorization'], // Ruxsat berilgan header’lar
// }));

// Middleware
app.use(express.json());

// MongoDB ulanish
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB ulandi'))
    .catch(err => console.log('MongoDB xatosi:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mentors', mentorRoutes);

// Serverni ishga tushirish
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portida ishlamoqda`);
    // uploads papkasi mavjudligini tekshirish
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
        console.log('Uploads papkasi yaratildi');
    }
});