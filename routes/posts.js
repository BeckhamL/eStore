const express = require("express");
const router = express.Router();
const Item = require("../models/item");

router.post("/newPosting", function(req, res) {

  let newPost = new Item ({
    itemName: req.body.itemName,
    itemImage: req.body.itemImage,
    itemCost: req.body.itemCost,
    itemOwner: req.body.itemOwner,
    itemDate: req.body.itemDate,
    itemDescription: req.body.itemDescription,
    itemCategory: req.body.itemCategory
  });

  Item.addItem(newPost, function(err, item) {
    if(err) {
      res.json({
        successs: false,
        msg: err
      })
    }
    else {
      res.json({
        success: true,
        msg: "Successfully added item"
      })
    }
  });
});

router.get("/dashboard", function(req, res) {
  Item.find({}, function(err, items) {
    if(err) {
      res.json({
        success: false,
        msg: err
      })
    }
    else {
      res.json(items);
    }
  });
});

router.delete("/dashboard", function(req, res) {
  let id = req.param('id');

  Item.deleteOne({"_id": id}, function(err, item) {
    if(err) {
      res.json({
        success: false,
        msg: err
      })
    }
    else {
      res.json({
        success: true,
        msg: "Successfully deleted"
      })
    }
  });
});

module.exports = router;