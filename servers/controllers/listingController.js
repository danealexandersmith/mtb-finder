const path = require('path')
const Bike = require(path.resolve('./models/BikeModel.js'))
const express = require('express');
const { Console } = require('node:console'); 

const listingController = {};

listingController.createListing = async = (req, res, next) => {
    const { Brand, Model, Year, Wheel, Front, Rear,  } = req.body;
}
