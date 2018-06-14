const paths = require('../../constants/paths');
const { authentication } = require('../../controllers');

module.exports = (router) => {
  router.post(paths.api.v1.AUTHENTICATION_LOGIN, authentication.login);
};