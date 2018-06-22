const authentication = require('./authentication');
const comments = require('./comments');
const files = require('./files');
const users = require('./users');
const videos = require('./videos');

module.exports = (router) => {
  authentication(router);
  comments(router);
  files(router);
  users(router);
  videos(router);
};