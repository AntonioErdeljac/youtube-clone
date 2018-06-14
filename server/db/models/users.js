const mongoose = require('mongoose');
const _ = require('lodash');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');

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

module.exports.create = (values) => {
  const user = _.omit(values, ['_id']);

  user.salt = crypto.randomBytes(16).toString('hex');
  user.hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');

  return Users(user).save()
    .then(newUser => Promise.resolve(_.omit(newUser.toObject(), ['authentication'])))
};

module.exports.validatePassword = (password, user) => {
  const hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');

  return hash === user.hash;
};

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