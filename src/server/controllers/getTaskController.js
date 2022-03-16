const debug = require("debug")("SCHEDBORD:controllers/getTask");
const { Project } = require("../../database/models/Project");

const getTaskController = async (req, res, next) => {
  debug("get task endpoint reached");
  try {
    const { projectId, taskId } = req.query;
    const project = await Project.findById(projectId);

    let returnMessage;
    project?.taskLists.forEach((taskList) => {
      const task = taskList?.tasks.id(taskId);
      if (task) {
        returnMessage = task;
      }
    });

    return res.status(returnMessage ? 200 : 404).json({
      error: !returnMessage,
      message: returnMessage ?? "could not find task",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = getTaskController;
