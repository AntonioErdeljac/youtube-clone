const mongoose = require('mongoose');
const _ = require('lodash');
const { Schema } = mongoose;

const Videos = mongoose.model('videos', new Schema({
  title: String,
  author: {
    ref: 'users',
    type: Schema.Types.ObjectId,
  },
  description: String,
  file: String,
}, { timestamps: true }));