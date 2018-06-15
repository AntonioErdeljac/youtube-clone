const paths = require('../../constants/paths');
const { videos } = require('../../controllers');
const authentication = require('../authentication');

module.exports = (router) => {
  router.post(paths.api.v1.VIDEOS, authentication.required, videos.create);
};
