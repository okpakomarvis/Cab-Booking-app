"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorName = exports.formatError = void 0;

const FormatError = require("easygraphql-format-error");

const formatError = new FormatError([{
  name: 'INVALID_EMAIL',
  message: 'The email is not valid ',
  statusCode: '400'
}, {
  name: 'UNAUTHORIZE',
  message: 'Unauthorized',
  statusCode: '401'
}, {
  name: 'UNAVAILABLE',
  message: 'Service Unavailable',
  statusCode: '503'
}, {
  name: 'INVALID_PASSWORD',
  message: 'The password is not valid',
  statusCode: '400'
}, {
  name: 'USERNOTFOUND',
  message: 'User not found',
  statusCode: '404'
}, {
  name: 'USERALREADY',
  message: 'user already exist!',
  statusCode: '400'
}, {
  name: 'DRIVERA',
  message: 'driver already exist!',
  statusCode: '400'
}, {
  name: 'DRIVERLOCALREADY',
  message: 'driver location already exist!',
  statusCode: '400'
}, {
  name: 'UNABLETOLOG',
  message: 'Oops something went wrong',
  statusCode: '408'
}, {
  name: 'NONEARBY',
  message: 'No Nearby Driver Found',
  statusCode: '400'
}]); // pass the errorName on the context

exports.formatError = formatError;
const errorName = formatError.errorName;
/* export const errorName = {
UNAUTHORIZED: 'UNAUTHORIZED'
};

export const errorType ={
    UNAUTHORIZED:{
        message: 'Authentication is needed to get response',
        statusCode: 401
    }
}; */

exports.errorName = errorName;