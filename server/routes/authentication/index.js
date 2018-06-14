const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;


  if(authorization) {
    const splittedAuthorization = authorization.split(' ');
    if(splittedAuthorization[0] === 'Token') {
      return splittedAuthorization[1];
    }
    return null;
  }

  return null;
};

const auth = {
  required: jwt({
    secret: 'youtube-clone',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'youtube-clone',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;