const jwtStrat = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const config = require("../config/database");

module.exports = function(passport){

  let options = {};
  options.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme('JWT');
  options.secretOrKey = config.secret;

  passport.use(new jwtStrat(options, function(jwt_payload, done) {

    User.getUserById(jwt_payload._id, function(err, user) {

      if(err) {
        return done(err, false);
      }

      if(user) {
        return done(null, user);
      }
      else {
        return done(null, false);
      }
    });
  }));
}