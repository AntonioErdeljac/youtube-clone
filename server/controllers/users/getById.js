const mongoose = require('mongoose');
const db = require('../../db');
const { errors } = require('../../utils');

module.exports = (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: 'user not found',
    });
  }

  return db.Users.getById(id)
    .then((response) => {
      if(!response) {
        return res.status(404).json({
          message: 'user not found',
        });
      }

      return res.status(200).json(response).end();
    })
    .catch(error => errors.respond(res, error));
};