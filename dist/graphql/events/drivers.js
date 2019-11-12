"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createdriverLocation = exports.createDrivers = void 0;

const {
  errorName,
  formatError
} = require('../../middleware/errorMiddleware');

const Drivers = require('../../models/drivers');

const Driversloc = require('../../models/driverlocation');

const createDrivers = async arg => {
  const drivers = new Drivers({
    first_name: arg.DriverInput.first_name,
    last_name: arg.DriverInput.last_name,
    email: arg.DriverInput.email,
    gender: arg.DriverInput.gender,
    dob: arg.DriverInput.dob,
    national_ID: arg.DriverInput.national_ID,
    profile_Pic: arg.DriverInput.profile_Pic,
    rating: arg.DriverInput.rating,
    address: arg.DriverInput.address,
    vehicle: arg.DriverInput.vehicle
  });
  let createdDrivers;

  try {
    const existingDrivers = await Drivers.findOne({
      email: arg.DriverInput.email
    });

    if (existingDrivers) {
      throw new Error(errorName.DRIVERA);
    }

    const result = await drivers.save();
    createdDrivers = { ...result._doc,
      _id: result.id
    };
    return createdDrivers;
  } catch (err) {
    console.log(err);
    throw new Error(errorName.UNAVAILABLE);
  }
};

exports.createDrivers = createDrivers;

const createdriverLocation = async arg => {
  const driversloc = new Driversloc({
    driver_ID: arg.DriverlocInput.driver_ID,
    latitude: arg.DriverlocInput.latitude,
    longitude: arg.DriverlocInput.longitude
  });
  let createdDriversloc;

  try {
    const existingDriversloc = await Driversloc.findOne({
      driver_ID: arg.DriverlocInput.driver_ID
    });

    if (existingDriversloc) {
      throw new Error(errorName.DRIVERLOCALREADY);
    }

    const result = await driversloc.save();
    createdDriversloc = { ...result._doc,
      _id: result.id
    };
    return createdDriversloc;
  } catch (err) {
    throw new Error(errorName.UNAVAILABLE);
  }
};

exports.createdriverLocation = createdriverLocation;