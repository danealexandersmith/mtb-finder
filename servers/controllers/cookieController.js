const express = require('express');
const path = require('path');
const { Console } = require('node:console'); 
const jwt = require('jsonwebtoken');
const User = require(path.resolve('./models/UserModel'));

cookieController = {};

cookieController.setSSID = async (req, res, next) => {
    const {username} = req.body;
    const user = User.findOne({username: username});

    const jToken = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: '1800s'})
    res.cookie('ssid', jToken, { expires: new Date(Date.now() + 300000), httpOnly: true });
    return next();
}

module.exports = cookieController;