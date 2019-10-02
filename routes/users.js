const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const config = require("../config/database");

router.post("/register", function(req,res) {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    userType: req.body.userType
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

router.get("/users", function(req, res) {
  User.find({}, (err, users) => {

    if(err) {
      res.json({
        success: false,
        msg: "Unable to get users"
      })
    }
    else {
      res.json({
        users
      })
    }
  });
});

router.post("/authenticate", function(req,res) {
  
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, function(err, user) {

    if(err) {
      throw err;
    }
    
    if(!user) {
      return res.json({success: false, msg: "No user found"});
    }

    User.comparePassword(password, user.password, function(err, isMatch) {
      if(err) {
        throw err;
      }
      
      if(isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800
        });

        res.json(
          {
            success: true, 
            token: "JWT " + token, 
            user: 
            {
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email,
              userType: user.userType
            }
          })
      }
      else {
        return res.json({success: false, msg: "Incorrect password"});
      }

    });
  });
});

// We are protecting the profile route, user must be authenticated to see this page
router.get("/profile", passport.authenticate('jwt', {session: false}), function(req,res) {
  res.json({
    user: req.user
  });
});

module.exports = router;