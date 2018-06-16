const mongoose = require('mongoose');
const { Schema } = mongoose;
const _ = require('lodash');

const Files = mongoose.model('files', new Schema({
  name: String,
  mimetype: String,
  filePath: String,
}, { timestamps: true }));

module.exports.isValid = (values) => !Files(values).validateSync();

module.exports.create = (values) => {
  const file = _.omit(values, ['_id']);

  return Files(file).save();
};

module.exports.getById = (id) => {
  const query = { _id: id };

  return Files.findOne(query);
};