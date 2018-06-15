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
      type: String,
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