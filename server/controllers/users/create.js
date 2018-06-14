const db = require('../../db');

const { uniqueFieldError } = require('../../utils/errors');

module.exports = (req, res) => {
  const newUser = req.body;

  if(!db.Users.isValid(newUser)) {
    return res.sendStatus(400);
  }

  return db.Users.create(newUser)
    .then(response => res.status(201).json({
      user: {
        ...response,
        token: db.Users.generateJWT(response),
      },
    }).end())
    .catch((error) => res.json(uniqueFieldError(error)));
};