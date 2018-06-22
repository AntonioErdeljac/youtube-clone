const mongoose = require('mongoose');
const db = require('../../db');
const { errors } = require('../../utils');

module.exports = (req, res) => {
  const video = req.params.videoId;

  if(!mongoose.Types.ObjectId.isValid(video)) {
    return res.status(400).json({
      message: 'Video not found',
    });
  }

  return db.Comments.getByVideo(video)
    .then(response => {
      if(!response) {
        return res.status(404).json({
          message: 'Video not found',
        });
      }
      return res.status(201).json(response)
    })
    .catch(error => errors.respond(error, res));
};