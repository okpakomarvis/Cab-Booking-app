"use strict";

const mongoose = require('mongoose');

const UserModel = require('../../models/user');

const Drivers = require('../../models/drivers');

const DriverLoc = require('../../models/driverlocation');

const Booking = require('../../models/booking');

const distance = require('./distancefunction');

const userData = {
  email: "best259@gmail.com",
  password: "best"
};
const driverData = {
  first_name: "Adams Ali",
  last_name: "Bacon",
  email: "bacon34@trec.com",
  gender: "Male",
  dob: "9/03/1989",
  national_ID: "20283910390",
  profile_Pic: "https://dummyimage.com/300.png/09f/fff",
  rating: "20",
  address: "3 Pennsylvania Ave.Meriden, CT 06450 ",
  vehicle: "Lexus"
};
const driverloc = {
  driver_ID: "20283910390",
  latitude: 20.35637,
  longitude: 19.35647
};
let creatorId;
const url = 'http://localhost:3000/graphql';
describe('Model creation  Test', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useCreateIndex: true
    }, err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });
  it('create & save user successfully', async () => {
    const validUser = new UserModel(userData);
    const savedUser = await validUser.save();
    creatorId = savedUser._id; // Object Id should be defined when successfully saved to MongoDB.

    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
  });
  it('create & save Drivers  with driver ID successfully', async () => {
    const validDriver = new Drivers(driverData);
    const savedDriver = await validDriver.save(); // Object Id should be defined when successfully saved to MongoDB.

    expect(savedDriver._id).toBeDefined();
    expect(savedDriver.email).toBe(driverData.email);
    expect(savedDriver.first_name).toBe(driverData.first_name);
    expect(savedDriver.last_name).toBe(driverData.last_name);
    expect(savedDriver.gender).toBe(driverData.gender);
    expect(savedDriver.dob).toBe(driverData.dob);
    expect(savedDriver.national_ID).toBe(driverData.national_ID);
  });
  it('create & save Drivers location successfully', async () => {
    const validDriver = new DriverLoc(driverloc);
    const savedDriverloc = await validDriver.save(); // Object Id should be defined when successfully saved to MongoDB.

    expect(savedDriverloc._id).toBeDefined();
    expect(savedDriverloc.driver_ID).toBe(driverloc.driver_ID);
    expect(savedDriverloc.latitude).toEqual(driverloc.latitude);
    expect(savedDriverloc.longitude).toEqual(driverloc.longitude);
  });
  it('Request & book cab  successfully', async () => {
    const createBooking = {
      username: "Barrister24",
      phone: "823389783782",
      Locationa: "359 Fulton Ave.Altoona, PA 16601",
      Locationb: "50 E. Lawrence Street Edison, NJ 08817",
      datecreated: "2019-11-10T13:31:32.525Z",
      status: "pending",
      creator: creatorId
    };
    const validBooking = new Booking(createBooking);
    const savedBooking = await validBooking.save(); // Object Id should be defined when successfully saved to MongoDB.

    expect(savedBooking.username).toBe(createBooking.username);
    expect(savedBooking.phone).toEqual(createBooking.phone);
    expect(savedBooking.Locationa).toEqual(createBooking.Locationa);
    expect(savedBooking.Locationb).toEqual(createBooking.Locationb);
    expect(savedBooking.datecreated).toEqual(createBooking.datecreated);
    expect(savedBooking.creator).toEqual(createBooking.creator);
  });
  it('get all cab bookings', async () => {
    const bookings = await Booking.find().populate({
      path: "creator",
      populate: {
        path: "createdBookings",
        populate: {
          path: "creator"
        }
      }
    });
    expect(bookings).not.toHaveLength(0);
  });
  it('get all user past bookings', async () => {
    const bookings = await Booking.find({
      creator: {
        $in: creatorId
      }
    }).populate('creator');
    expect(bookings).toHaveLength(1);
  });
  it('get all Nearby cab ', async () => {
    let maxDistance = 500; // request nearby car max distance 500 km

    const driverlist = [];
    const driverLocation = await DriverLoc.find();
    const listDrivers = await Drivers.find();
    const driveridMap = listDrivers.map(result => {
      return { ...result._doc,
        _id: result.id
      };
    });
    const userLatitude = 59.3293371;
    const userLongitude = 13.4877472;

    for (let i in driverLocation) {
      if (distance(userLatitude, userLongitude, driverLocation[i].latitude, driverLocation[i].longitude, 'K') < maxDistance) {
        const driver = listDrivers.filter(result => result._id == driverLocation[i].driver_ID);
        driverlist.push(driver);
      }
    }

    const convertDriver = driverlist.reduce((accumalator, previousValue) => accumalator.concat(previousValue), []);
    expect(convertDriver).toHaveLength(0);
  });
});