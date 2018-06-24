const db = require('../../db');
const { errors } = require('../../utils');

module.exports = (req, res) => {
  const { id } = req;

  return db.Videos.getById(id)
    .then(response => res.status(201).json(response).end())
    .catch(error => errors.respond(error, res));
};