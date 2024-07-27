// models/user.js

const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  captchaInput:{
    type: String,
    required: true,
  },
  captcha:{
    type: String,
    required: true,  
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
