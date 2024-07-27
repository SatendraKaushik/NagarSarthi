const mongoose = require('mongoose');

const registrationFormSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },
      Phone: {
        type: String,
        required: true
      },
      Address: {
        type: String,
        required: true
      },
      district: {
        type: String,
        required: true
      },
      department:{
        type:String,
      },
      State: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      PinCode: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      }
    },{validateBeforeSave:false}); 
const RegistrationForm = mongoose.model('RegistrationForm', registrationFormSchema);

module.exports = RegistrationForm;
