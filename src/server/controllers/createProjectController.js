const debug = require("debug")("SCHEDBORD:controllers/create-project");
const { Project } = require("../../database/models/Project");
const { User } = require("../../database/models/User");
const getProjectInfo = require("../utils/getProjectInfo");

const createProjectController = async (req, res, next) => {
  debug("enpoint reached");

  try {
    const user = await User.findOne({ mail: req.userInfo.mail });
    const project = new Project(req.body.data);

    project.users.push(user.id);
    user.projects.push(project.id);

    await project.save();
    await user.save();

    const projectInfo = await getProjectInfo(project.id);
    return res.status(201).json({ error: false, message: projectInfo });
  } catch (error) {
    debug("creation process failed");
    return next(error);
  }
};

module.exports = createProjectController;
