const users = require('./users');
const authentication = require('./authentication');
const videos = require('./videos');
const files = require('./files');

module.exports = (router) => {
  users(router);
  files(router);
  authentication(router);
  videos(router);
};