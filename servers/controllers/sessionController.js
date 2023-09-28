const express = require('express');


const sessionController = {};

sessionController.isLoggedIn = async (req, res, next) => {
    if (req.cookies.ssid) return next();
    res.redirect('/');
};

module.exports = sessionController;