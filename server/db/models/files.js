const mongoose = require('mongoose');
const { Schema } = mongoose;

const Files = mongoose.model('files', new Schema({
  name: String,
  mimetype: String,
  data: String,
  path: String,
}, { timestamps: true }));

module.exports.isValid = (values) => !Files(values).validateSync();

module.exports.getById = (id) => {
  const query = { _id: id };

  return Files.findOne(query);
};