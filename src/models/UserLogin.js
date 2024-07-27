const mongoose = require('mongoose');

const UserLoginSchema = new mongoose.Schema({
  firstName: {
    type: String,
   

  },
  lastName: {
    type: String,
    
  },
  email: {
    type: String,
   
  },
  PhoneNumber: {
    type: String,
   
},

  dob: {
    type: Date,
   
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Others'],
    
  },
  address: {
    type: String,
  
  },
  district: {
    type: String,
  },
  state: {
    type: String,
 
  },
  country: {
    type: String,
   
  },
  pinCode: {
    type: String,
    
  },
  password: {
    type: String,
  
  },
  uniqueId: {
    type: String,
   
  }
},{ validateBeforeSave: false });

const UserLogin = mongoose.model('UserLogin', UserLoginSchema);

module.exports = UserLogin;
