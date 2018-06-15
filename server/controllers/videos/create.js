const db = require('../../db');
const _ = require('lodash');
const { errors } = require('../../utils');

module.exports = (req, res) => {
  const newVideo = req.body;
  const { id } = req.payload;

  if(!db.Videos.isValid(newVideo)) {
    return res.sendStatus(400);
  }

  return db.Users.getById(id)
    .then((existingUser) => {
      if(!existingUser) {
        return res.sendStatus(400);
      }

      _.merge(newVideo, { general: { author: existingUser._id } });

      return db.Videos.create(newVideo)
        .then((response) => res.status(201).json(response));
    })
    .catch(error => errors.respond(error, res));
};