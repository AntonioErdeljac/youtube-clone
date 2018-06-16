const path = require('path');
const appDir = path.dirname(require.main.filename);
const db = require('../../db');
const { errors } = require('../../utils');

module.exports = (req, res) => {
  const { file } = req.files;

  if(file) {
    const filePath = `${appDir}/public/videos/${file.name}`;

    file.mv(filePath)
      .then(() => {
        const updatedFile = {
          name: file.name,
          filePath,
          mimetype: file.mimetype,
        }

        if(!db.Files.isValid(updatedFile)) {
          return res.sendStatus(400);
        }

        return db.Files.create(updatedFile)
          .then((response) => res.status(201).json(response));
      })
      .catch(error => errors.respond(error, res));
  };
};