const User = require('../Models/UserModel');
const express = require('express');
const { Console } = require('node:console'); 

const userController = {}

userController.testBody = async (req, res, next) => {
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


module.exports = userController;