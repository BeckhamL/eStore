const mongoose = require("mongoose");
const Category = require("./category");

const itemSchema = mongoose.Schema({
  itemName: {type: String},
  itemImage: {type: String},
  itemCost: {type: Number},
  itemOwner: {type: String},
  itemDate: {type: Date},
  itemDescription: {type: String},
  itemQuantity: {type: Number},
  itemCategory: {type: Category}
});

const Item = module.exports = mongoose.model("Item", itemSchema);

module.exports.addItem = function(item, callback) {
  item.save(callback);
}
