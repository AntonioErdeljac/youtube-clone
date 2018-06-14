const users = require('./users');
const authentication = require('./authentication');

module.exports = (router) => {
  users(router);
  authentication(router);
};