const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bikeSchema = new Schema({
    Brand: {type: String, required: false},
    Model: {type: String, required: false},
    Year: {type: String, required: false},
    Wheel: {type: String, required: false},
    FrontTravel: {type: String, required: false},
    RearTravel: {type: String, required: false},
    Price: {type: String, required: false},
  });
  
  module.exports = mongoose.model('Bike', bikeSchema);