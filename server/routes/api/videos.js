const paths = require('../../constants/paths');
const { videos } = require('../../controllers');
const authentication = require('../authentication');

module.exports = (router) => {
  router.post(paths.api.v1.VIDEOS, authentication.required, videos.create);
  router.get(paths.api.v1.VIDEOS, authentication.optional, videos.get);

  router.get(paths.api.v1.VIDEOS_ID, authentication.optional, videos.getById);
};
