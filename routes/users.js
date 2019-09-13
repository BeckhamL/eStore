const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/register", function(req,res) {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, function(err, user) {
    if(err) {
      res.json({
        successs: false,
        msg: err
      })
    }
    else {
      res.json({
        success: true,
        msg: "Successfully registered user"
      })
    }
  });
});

router.post("/authenticate", function(req,res) {
  res.send("authenticate");
});

router.get("/profile", function(req,res) {
  res.send("profile");
});

module.exports = router;