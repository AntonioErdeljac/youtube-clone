const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const db = require('../db');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  return db.Users.getByEmail(email)
    .then((user) => {
      if(!user) {
        return done(null, false, {
          message: 'email is invalid',
        });
      }

      if(!db.Users.validatePassword(password, user)) {
        return done(null, false, {
          message: 'password is invalid',
        });
      }

      return done(null, user);
    });
}));