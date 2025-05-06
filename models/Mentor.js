const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    middleName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    postalAddress: {
        type: String,
        trim: true,
    },
    birthDate: {
        type: Date,
        trim: true,
    },
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    photo: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        trim: true,
    },
    salary: {
        type: Number,
        trim: true,
    },
    startDate: {
        type: Date,
        trim: true,
    },
    endDate: {
        type: Date,
        trim: true,
    },
    paymentType: {
        type: String,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Director',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Mentor', mentorSchema);