"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nearByDrivers = void 0;

const Drivers = require('../../models/drivers');

const Driversloc = require('../../models/driverlocation');

const {
  errorName,
  formatError
} = require('../../middleware/errorMiddleware');

const nearByDrivers = async () => {
  let maxDistance = 500; // request nearby car max distance 500 km

  const driverlist = [];

  try {
    const driverLocation = await Driversloc.find();
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

    if (!convertDriver) {
      throw new Error(errorName.NONEARBY);
    }

    return convertDriver;
  } catch (err) {
    throw new Error(errorName.UNAVAILABLE);
  }
};

exports.nearByDrivers = nearByDrivers;

const distance = (lat1, lon1, lat2, lon2, unit) => {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    if (dist > 1) {
      dist = 1;
    }

    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;

    if (unit == 'K') {
      dist = dist * 1.609344;
    }

    if (unit == 'N') {
      dist = dist * 0.8684;
    }

    return dist;
  }
};