const router = require('express').Router();

const api = require('./api');

module.exports = () => {
  api(router);

  return router;
};