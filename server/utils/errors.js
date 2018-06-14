module.exports.uniqueFieldError = (error) => {
  const errorField = Object.keys(error.errors)[0];
  const errorMessage = error.errors[errorField].message;

  return {
    [errorField]: errorMessage,
  };
}