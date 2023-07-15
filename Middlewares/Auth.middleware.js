const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const Authenctication = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  //console.log(token)
  var decoded = jwt.verify(token, process.env.SECRET_KEY);
  const { email } = decoded;

  if (decoded) {
    //console.log(decoded);
    req.body.email = email;
    next();
  } else {
    res.send({ msg: "please login again" });
  }
};

module.exports = { Authenctication };
