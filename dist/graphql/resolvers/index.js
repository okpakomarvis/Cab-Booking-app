"use strict";

const {
  bookings,
  pastBooking,
  createBooking
} = require('../events/bookings');

const {
  createDrivers,
  createdriverLocation
} = require('../events/drivers');

const {
  createUser,
  login
} = require('../events/user');

const {
  nearByDrivers
} = require('../events/nearbyDriver');

module.exports = {
  // get all cab bookings and user information
  bookings: bookings,
  //get user past cab Bookings
  pastBookings: pastBooking,
  //request for cab Booking
  createBooking: createBooking,
  // create drivers information
  createDrivers: createDrivers,
  // create drivers Location and upadate the latitude and longitude later
  createDriverLocation: createdriverLocation,
  // create user 
  createUser: createUser,
  //user login
  login: login,
  //get nearby cab drivers
  requestCabNearBy: nearByDrivers
};