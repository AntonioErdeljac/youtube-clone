const db = require('../../db');
const { errors } = require('../../utils');

module.exports = (req, res) => {
  return db.Users.get({ ...req.query })
    .then(response => res.json(response))
    .catch(error => errors(error, res));
};