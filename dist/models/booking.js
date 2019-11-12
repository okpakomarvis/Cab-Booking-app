"use strict";

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bookingSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  Locationa: {
    type: String,
    required: true
  },
  Locationb: {
    type: String,
    required: true
  },
  datecreated: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});
module.exports = mongoose.model('Booking', bookingSchema);