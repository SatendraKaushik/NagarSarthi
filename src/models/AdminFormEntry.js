const mongoose = require('mongoose');

const formEntrySchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    district: String,
    description: String,
    imagePath: String,
    uploadPath: String,
    date: Date,
    time: String,
    latitude: Number,
    longitude: Number,
    accept: { type: Boolean, default: false },
    reject: { type: Boolean, default: false },
    hold: { type: Boolean, default: false },
    reason: String,
    complete: { type: Boolean, default: false },
    remark:String,
    CompleteDate:Date,
    dateTime: Date ,
    completefile:String,
});

module.exports = mongoose.model('FormEntry', formEntrySchema);
