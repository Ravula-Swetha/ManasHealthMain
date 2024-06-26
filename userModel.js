const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true 
  },
  category: {
    type: String,
    enum: ['Student', 'Teacher'],
    required: true
  },
  instituteName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 6
  },
  className: {
    type: String,
  },
  sectionName: {
    type: String,
  },

  age:{
    type:Number
  }
});

const User = mongoose.model('users', userSchema);
module.exports = User;
