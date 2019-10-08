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
    userType: req.body.userType,
    itemsInCart: req.body.itemsInCart,
    itemsInFavourite: req.body.itemsInFavourite,
    itemsPurchased: req.body.itemsPurchased
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
              userType: user.userType,
              itemsInCart: user.itemsInCart,
              itemsInFavourite: user.itemsInFavourite,
              itemsPurchased: user.itemsPurchased
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

router.post("/store/addToCart", function(req, res) {

  let id = req.param('id');
  let item = req.param('item');

  User.updateOne({"_id": id}, {$addToSet: {"itemsInCart": item}}, function(err, item) {
    if(err) {
      res.json({
        success: false,
        msg: err
      })
    }
    else {
      res.json({
        success: true,
        msg: "Successfully updated"
      })
    }
  });
});

router.post("/store/addToFavourite", function(req, res) {

  let id = req.param('id');
  let item = req.param('item');

  User.updateOne({"_id": id}, {$addToSet: {"itemsInFavourite": item}}, function(err, item) {
    if(err) {
      res.json({
        success: false,
        msg: err
      })
    }
    else {
      res.json({
        success: true,
        msg: "Successfully updated"
      })
    }
  });
});

router.get("/favourites", function(req, res) {

  let id = req.param('id');

  User.findOne({"_id": id}, {"itemsInFavourite": 1, "_id": 0}, function(err, item) {

    if(err) {
      res.json({
        success: false,
        msg: err
      })
    }
    else {
      res.json(item)
    }
  });
})

router.get("/cart", function(req, res) {

  let id = req.param('id');

  User.findOne({"_id": id}, {"itemsInCart": 1, "_id": 0}, function(err, item) {

    if(err) {
      res.json({
        success: false,
        msg: err
      })
    }
    else {
      res.json(item)
    }
  });
})

module.exports = router;