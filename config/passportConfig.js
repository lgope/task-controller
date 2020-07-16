const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/userModel');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        // Match user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        if (!(await user.correctPassword(password, user.password))) {
          return done(null, false, { message: 'Incorrect email or password' });
        } else {
          return done(null, user);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
