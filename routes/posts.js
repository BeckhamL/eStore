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
    itemCategory: req.body.itemCategory,
    itemQuantity: req.body.itemQuantity,
    itemPurchasedBy: req.body.itemPurchasedBy
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

router.get("/dashboard/itemID", function(req, res) {

  let id = req.param('id');

  Item.find({"_id": id}, function(err, items) {
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

router.get("/dashboard/search", function(req, res) {

  if (req.query.name == undefined) {
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
  }
  else {
    Item.find({"itemName": { $regex: req.query.name, $options: 'i'} }, function(err, items) {
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
 }
});

router.get("/dashboard/filter", function(req,res) {

  if (req.query.category == undefined) {
    Item.find({"itemCost": {$lte: req.query.price}}, function(err, items) {

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
  }
  else if (req.query.price == undefined) {
    Item.find({"itemCategory": req.query.category}, function(err, items) {

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
  }
  else {
    Item.find({"itemCategory": req.query.category, "itemCost": {$gt: 1, $lt: req.query.price+1}}, function(err, items) {

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
  }
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

router.post("/store/update", function(req, res) {
  let id = req.param('id');

  Item.updateOne({"_id" :id}, {$inc: {"itemQuantity": -1 }}, function(err, item) {

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

module.exports = router;