const mongoose = require('mongoose');
const _ = require('lodash');
const { Schema } = mongoose;

const Videos = mongoose.model('videos', new Schema({
  general: {
    title: {
      type: String,
      required: true,
    },
    author: {
      ref: 'users',
      type: Schema.Types.ObjectId,
    },
    description: String,
    file: {
      type: Schema.Types.ObjectId,
      ref: 'files',
      required: true,
    },
  },
  statistics: {
    views: {
      type: Number,
      default: 0,
    },
    upvotes: {
      type: Number,
      default: 0,
    }
  }
}, { timestamps: true }));

module.exports.isValid = values => !Videos(values).validateSync();

module.exports.create = (values) => {
  const video = _.omit(values, ['_id']);

  return Videos(video).save();
};

module.exports.getById = (id) => {
  const query = { _id: id };

  return Videos.findOne(query);
};

module.exports.get = (options = {}) => {
  const { keyword } = options;

  const query = {};

  if(keyword) {
    query.$or = [
      { 'general.title': new RegExp(_.escapeRegExp(_.trim(keyword)), 'i') },
      { 'general.description': new RegExp(_.escapeRegExp(_.trim(keyword)), 'i') },
    ];
  }

  return Videos.find(query)
    .sort({ 'general.title': 1 })
};