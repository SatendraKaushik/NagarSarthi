// models/CanvaImage.js
const mongoose = require('mongoose');

const canvaImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true }
});

module.exports = mongoose.model('CanvaImage', canvaImageSchema);
