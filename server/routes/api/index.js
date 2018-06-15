const users = require('./users');
const authentication = require('./authentication');
const videos = require('./videos');

module.exports = (router) => {
  users(router);
  authentication(router);
  videos(router);
};