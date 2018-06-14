const db = require('../../db');
const { errors } = require('../../utils');
const _ = require('lodash');

module.exports = (req, res) => {
  const { id } = req.params;
  const { payload } = req;

  return db.Users.getById(payload.id)
    .then((currentUser) => {
      if(!currentUser) {
        return res.sendStatus(403).end();
      }

      return db.Users.getById(id)
        .then((existingUser) => {
          if(payload.id.toString() !== existingUser._id.toString()) {
            return res.sendStatus(403).end();
          }

          if(typeof req.body.firstName !== 'undefined') {
            existingUser.personal.firstName = req.body.firstName;
          }

          if(typeof req.body.lastName !== 'undefined') {
            existingUser.personal.lastName = req.body.lastName;
          }

          if(typeof req.body.email !== 'undefined') {
            existingUser.contact.email = req.body.email;
          }

          return existingUser.save()
            .then(() => res.status(200).json(_.omit(existingUser, ['authentication'])));
        });
    })
    .catch(error => errors.respond(res, error));
};