const debug = require("debug")("SCHEDBORD:controllers/modify-task");
const { Project } = require("../../database/models/Project");

const modifyTaskController = async (req, res, next) => {
  debug("modify task controller reached");
  const { taskId, projectId } = req.body.params;

  const project = await Project.findById(projectId);

  let foundTask;

  project.taskLists.forEach((taskList) => {
    const task = taskList.tasks.id(taskId);
    if (task) {
      foundTask = task;
    }
  });

  return res.status(200).json({
    error: false,
    message: foundTask,
  });
};

module.exports = modifyTaskController;
