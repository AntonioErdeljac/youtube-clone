const paths = require('../../constants/paths');
const { files } = require('../../controllers');
const authentication = require('../authentication');

module.exports = (router) => {
  router.post(paths.api.v1.FILES, authentication.optional, files.upload);
}