const users = require('./users');
const authentication = require('./authentication');
const videos = require('./videos');
const files = require('./files');
const comments = require('./comments');

module.exports.authentication = authentication;
module.exports.users = users;
module.exports.videos = videos;
module.exports.files = files;
module.exports.comments = comments;