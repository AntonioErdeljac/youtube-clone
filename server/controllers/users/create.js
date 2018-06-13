const db = require('../../db');

module.exports = (req, res) => {
  const newUser = req.body;

  if(!db.Users.isValid(newUser)) {
    return res.sendStatus(400);
  }

  if(!db.Users.isUnique(newUser)) {
    return res.status(400).json({
      errors: {
        email: 'is already taken',
      },
    });
  }

  return db.Users.create(newUser)
    .then(response => res.status(201).json(response).end())
};