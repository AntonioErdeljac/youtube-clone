const mongoose = require('mongoose');

const db = require('../../db');
const { errors } = require('../../utils');

module.exports = (req, res) => {
  const { id } = req.payload;
  const { commentId } = req.params;
  const comment = req.body;

  if(!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.sendStatus(400);
  }

  if(!db.Comments.isValid(comment)) {
    return res.sendStatus(400);
  }

  return db.Comments.getById(commentId)
    .then((response) => {
      if(!response) {
        return res.sendStatus(404);
      }

      if(response.author.toString() === id.toString()) {
        return db.Comments.updateById(commentId, comment)
        .then((response) => {
          if(!response) {
            return res.status(404).json({
              message: 'Comment not found',
            });
          }

          return res.status(201).json(response);
        })
      } else {
        return res.sendStatus(403);
      }
    })
    .catch(error => errors.respond(error, res));
};