const debug = require("debug")("SCHEDBORD:middleware/validate");
const { Project } = require("../../database/models/Project");

const validateProject = (req, res, next) => {
  debug("running Project validation...");
  const project = req.body.data;
  const validation = Project.checkIfValid(project);

  if (validation.error || !project) {
    debug(validation.error);

    return res.status(400).json({
      error: true,
      mesage: validation,
    });
  }

  return next();
};

module.exports = validateProject;
