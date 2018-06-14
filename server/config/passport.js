const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const db = require('../db');

passport.use(new LocalStrategy({
  usernameField: 'contact[email]',
  passwordField: 'authentication[password]',
}, (email, password, done) => {
  db.Users.getByEmail(email)
    .then((user) => {
      if(!user) {
        return done(null, false, {
          errors: {
            email: 'is invalid',
          },
        });
      }

      if(!db.Users.validatePassword(password, user)) {
        return done(null, false, {
          errors: {
            password: 'is invalid',
          },
        });
      }

      return done(null, user);
    });
}));