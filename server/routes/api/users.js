const paths = require('../../constants/paths');
const { users } = require('../../controllers');
const authentication = require('../authentication');

module.exports = (router) => {
  router.post(paths.api.v1.USERS, authentication.optional, users.create);

  router.get(paths.api.v1.USERS_ID, authentication.optional, users.getById);
};