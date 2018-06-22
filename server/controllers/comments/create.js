const db = require('../../db');
const { errors } = require('../../utils');

module.exports = (req, res) => {
  const comment = req.body;

  if(!db.Comments.isValid(comment)) {
    return res.sendStatus(400);
  }

  return db.Comments.create(comment)
    .then(response => res.status(201).json(response))
    .catch(error => errors.respond(error, res));
};