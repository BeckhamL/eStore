const Item = require("./item");

const userM = {
  name: {type: String},
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true},
  password: {type:String, required: true},
  userType: {type:String, required: true},
  itemsInCart: {type: Array, Item: []},
  itemsInFavourite: {type: Array, Item: []},
  itemsPurchased: {type: Array, Item: []}
}