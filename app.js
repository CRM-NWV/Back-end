const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

dotenv.config();
const app = express();

// CORS middleware’ni aniq sozlash
app.use(cors({
    origin: 'http://localhost:5173', // Frontend manzili
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Agar autentifikatsiya yoki cookie kerak bo‘lsa
}));

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
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
        console.log('Uploads papkasi yaratildi');
    }
});