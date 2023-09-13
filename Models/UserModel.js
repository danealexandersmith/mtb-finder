const mongoose = require('mongoose');

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {type: String, required: false},
    email: {type: String, required: false},
    password: {type: String, required: false},
  });

  userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
      if(err) return next(err);
      this.password = hash;
      return next();
    });
  });
  
  module.exports = mongoose.model('User', userSchema);