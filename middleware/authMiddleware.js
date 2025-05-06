const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Token topilmadi' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.director = decoded; // Token ichidagi direktor ID ni saqlaymiz
        next();
    } catch (error) {
        res.status(401).json({ message: 'Yaroqsiz token' });
    }
};

module.exports = authMiddleware;