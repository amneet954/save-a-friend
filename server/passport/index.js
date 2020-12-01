const { User } = require("../models");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username }, (error, user) => {
        if (error) throw error;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) throw error;
          if (result === true) return done(null, user);
          else return done(null, false);
        });
      });
    })
  );

  passport.serializeUser((user, callback) => {
    callback(null, user.id);
  });

  passport.deserializeUser((id, callback) => {
    User.findOne({ _id: id }, (error, user) => {
      const userInformation = {
        username: user.username,
      };
      callback(error, userInformation);
    });
  });
};
