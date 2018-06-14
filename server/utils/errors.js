module.exports.uniqueFieldError = (error) => {
  const errorField = Object.keys(error.errors)[0];
  const errorMessage = error.errors[errorField].message;

  return {
    message: `${errorField} ${errorMessage}`,
  };
}

module.exports.respond = (res, error = {}) => {
  console.log(error);

  if(error.handledError) {
    return res.status(error.code).json({ message: error.message }).end();
  }

  return res.status(500).end();
};