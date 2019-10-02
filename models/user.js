const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

const UserSchema = mongoose.Schema({
  name: {type: String},
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true},
  password: {type:String, required: true},
  userType: {type:String, required: true}
});

const User = module.exports = mongoose.model("User", UserSchema);

module.exports.getUserById = function(id, callback) {

  User.findById(id, callback);

};

module.exports.getUserByUsername = function(username, callback) {
  const query = {username: username};
  User.findOne(query, callback);

}

// Need to encrypt users password

module.exports.addUser = function(user, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) {
        throw err;
      }

      user.password = hash;
      user.save(callback);
    });
  });
}

module.exports.comparePassword = function(password, hash, callback) {

  bcrypt.compare(password, hash, function(err, isMatch) {

    if (err) {
      throw err;
    }
    callback(null, isMatch);
  });
  
};