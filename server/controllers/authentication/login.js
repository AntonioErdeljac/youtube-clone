const passport = require('passport');
const _ = require('lodash');
const db = require('../../db');

module.exports = (req, res) => {
  if(!req.body.email) {
    return res.status(400).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!req.body.password) {
    return res.status(400).json({
      errors: {
        email: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return res.status(400).json(err);
    }

    if(passportUser) {
      const user = passportUser;

      const ommitedUser = _.omit(user.toObject(), ['authentication']);
      const userWithToken = _.merge(ommitedUser, { token: db.Users.generateJWT(user) });

      return res.json(userWithToken);
    }
  })(req, res);
};