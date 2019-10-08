const Item = require("./item");

const userM = {
  name: {type: String},
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true},
  password: {type:String, required: true},
  userType: {type:String, required: true},
  itemsInCart: {type: Array, String: []},
  itemsInFavourite: {type: Array, String: []},
  itemsPurchased: {type: Array, String: []}
}