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
  res.send({
    item: req
  });
});

module.exports = router;