const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {type: String, required: false},
    email: {type: String, required: false},
    password: {type: String, required: false},
  });
  
  module.exports = mongoose.model('User', userSchema);