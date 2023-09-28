const path = require('path')
const User = require(path.resolve('./models/UserModel.js'))
const express = require('express');
const { Console } = require('node:console'); 
const bcrypt = require('bcryptjs');

const userController = {}

userController.createUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    const newUser = {
        userName: username, 
        email: email, 
        password: password,
    }

    const user = await User.find({userName: username});
    if (user.length !== 0 || !newUser.password || !newUser.email || !newUser.userName) return next('Unable to create new user account');

    User.create(newUser)
      .then((data) => console.log(data)).then(() => next())
      .catch((err) => next(err));
}

userController.authenticate = async (req, res, next) => {

    const { username, password } = req.body;

    if(!username) return res.redirect('/signup');

    const user = await User.findOne({ userName: username });
  
    bcrypt.compare(password, user?.password)
      .then(result => {
        if (!result) {
          return res.redirect('/signup');
        } else {
          return next();
        }
      });
  };


module.exports = userController;