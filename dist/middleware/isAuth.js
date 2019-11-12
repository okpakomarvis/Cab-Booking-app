"use strict";

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(' ')[1];

  if (!token || token === '') {
    return next();
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT);
  } catch (err) {
    console.log("[error]", err);
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.userId = decodedToken.userId;
  console.log("ID", req.userId);
  next();
};