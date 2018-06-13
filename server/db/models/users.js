const mongoose = require('mongoose');
const _ = require('lodash');
const uniqueValidator = require('mongoose-unique-validator');

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
    },
  },
}, { timestamps: true }));

module.exports.isValid = values => !Users(values).validateSync();

module.exports.isUnique = values => {
  Promise.resolve(Users.findOne({
    'contact.email': values.contact.email,
  }).then((existingUser) => {
    if(!existingUser) {
      return true;
    }
    return false;
  }));
};

module.exports.create = (values) => {
  const user = _.omit(values, ['_id']);

  return Users(user).save()
    .then(newUser => Promise.resolve(_.omit(newUser.toObject(), ['authentication'])))
};