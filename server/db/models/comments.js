const mongoose = require('mongoose');

const { Schema } = mongoose;

const Comments = mongoose.model('comments', new Schema({
  author: { ref: 'users', type: Schema.Types.ObjectId },
  body: { type: String, required:  true },
  upvotes: { type: Number, default: 0 },
  video: { ref: 'videos', type: Schema.Types.ObjectId },
}, { timestamps: true }));

module.exports.isValid = (values) => !Comments(values).validateSync();

module.exports.create = (values) => {
  const comment = _.omit(values, ['_id']);

  return Comments(comment).save();
};

module.exports.updateById = (id, values) => {
  const query = { _id: id };
  const updatedComment = _.omit(values, ['_id']);

  return Comments.findOneAndUpdate(query, updatedComment, { new: true });
};

module.exports.getById = (id) => {
  const query = { _id: id };

  return Comments.findOne(query);
};

module.exports.getByVideo = (video) => {
  const query = { video };

  return Comments.find(query);
};

module.exports.deleteById = (id) => {
  const query = { _id: id };

  return Comments.remove(query);
};