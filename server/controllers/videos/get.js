const db = require('../../db');
const { errors } = require('../../utils');

module.exports = (req, res) => {
  return db.Videos.get({ ...req.query })
    .then(response => res.status(201).json(response).end())
    .catch(error => errors.respond(error, res));
};