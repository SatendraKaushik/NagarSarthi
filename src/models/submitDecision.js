const mongoose = require('mongoose');

const formEntrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    uploadPath: {
        type: String,
        required: true
    },
    decision: {
        type: String,
        enum: ['accept', 'reject', 'hold'],
        required: true
    }
});

const FormEntry = mongoose.model('FormEntry', formEntrySchema);

module.exports = FormEntry;
