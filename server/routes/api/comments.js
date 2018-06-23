const paths = require('../../constants/paths');
const { comments } = require('../../controllers');
const authentication = require('../authentication');

module.exports = (router) => {
  router.post(paths.api.v1.COMMENTS, authentication.required, comments.create);
  router.get(paths.api.v1.COMMENTS, authentication.optional, comments.getByVideoId);

  router.patch(paths.api.v1.COMMENT_ID, authentication.required, comments.updateById);
};