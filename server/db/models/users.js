const mongoose = require('mongoose');
const _ = require('lodash');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const db = require('../../db');

const { Schema } = mongoose;

const Users = mongoose.model('users', new Schema({
  personal: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  authentication: {
    hash: String,
    salt: String,
  },
  contact: {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
}, { timestamps: true })
.plugin(uniqueValidator, { message: 'is already taken' }));

module.exports.isValid = values => !Users(values).validateSync();

module.exports.getByEmail = (email) => {
  const query = { 'contact.email': email };

  return Users.findOne(query);
}

module.exports.generateJWT = (user) => {
  const today = new Date();
  const expirationDate = new Date(today);

  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: user.email,
    id: user._id,
    exp: parseInt(expirationDate / 1000, 10),
  }, 'youtube-clone');
};

module.exports.create = (values) => {
  const user = _.omit(values, ['_id']);

  _.merge(user, {
    authentication: {
      salt: crypto.randomBytes(16).toString('hex')
    }
  });

  _.merge(user, {
    authentication: {
      hash: crypto.pbkdf2Sync(user.authentication.password, user.authentication.salt, 10000, 512, 'sha512').toString('hex')
    }
  });

  return Users(user).save()
    .then(newUser => {
      const ommitedUser = _.omit(newUser.toObject(), ['authentication']);

      return Promise.resolve(ommitedUser);
    });
};

module.exports.validatePassword = (password, user) => {
  const hash = crypto.pbkdf2Sync(password, user.authentication.salt, 10000, 512, 'sha512').toString('hex');

  return hash === user.authentication.hash;
};

module.exports.getById = (id) => {
  const query = { _id: id };

  return Users.findOne(query)
    .then(existingUser => {
      return Promise.resolve(_.omit(existingUser.toObject(), ['authentication']));
    });
};
