const debug = require("debug")("SCHEDBORD:controllers/project");

const { Project } = require("../../database/models/Project");

const getProjectController = async (req, res, next) => {
  debug("recieved request at project endpoint");
  try {
    debug(`requested project's id: ${req.body.projectId}`);
    const project = await Project.findById(req.body.projectId);
    if (!project) {
      return res.status(404).json({
        error: false,
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
