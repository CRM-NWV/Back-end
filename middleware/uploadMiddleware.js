const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Fayllarni saqlash uchun papka
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Fayl nomini vaqt bilan belgilaymiz
    },
});

const upload = multer({ storage: storage });

module.exports = upload;