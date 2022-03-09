const { User } = require("../../database/models/User");
const getProjectInfo = require("../utils/getProjectInfo");

const getUserProjectsController = async (req, res, next) => {
  try {
    const user = await User.findOne({ mail: req.userInfo.mail });

    const projects = [];
    await Promise.all(
      user.projects.map(async (projectId) => {
        const projectInfo = await getProjectInfo(projectId);
        projects.push(projectInfo);
      })
    );

    return res.json({
      error: false,
      message: { projects },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = getUserProjectsController;
