const debug = require("debug")("SCHEDBORD:controllers/modify-task");
const { Project } = require("../../database/models/Project");

const modifyTaskController = async (req, res, next) => {
  debug("modify task controller reached");
  try {
    const { taskId, projectId } = req.body.params;
    const inputTask = req.body.data;
    const project = await Project.findById(projectId);

    let updatedTask;
    project.taskLists.forEach((taskList) => {
      const task = taskList.tasks.id(taskId);
      if (task) {
        Object.assign(task, inputTask);
        updatedTask = task;
        project.save();
      }
    });

    return res.status(200).json({
      error: false,
      message: updatedTask,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = modifyTaskController;
