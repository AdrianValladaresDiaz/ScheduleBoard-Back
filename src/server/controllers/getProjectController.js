const debug = require("debug")("SCHEDBORD:controllers/project");

const { Project } = require("../../database/models/Project");

const getProjectController = async (req, res, next) => {
  debug("recieved request at project endpoint");

  try {
    debug(`requested project's id: ${req.query.projectId}`);
    const project = await Project.findById(`${req.query.projectId}`);
    debug(`found this: ${project}`);

    if (!project) {
      debug(`Could not find project with id: ${req.query.projectId}`);
      return res.status(404).json({
        error: true,
        message: "couldn't find project",
      });
    }
    return res.json({
      error: false,
      message: project,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = getProjectController;
