const debug = require("debug")("SCHEDBORD:controllers/deleteTask");
const { Project } = require("../../database/models/Project");

const deleteTaskController = async (req, res, next) => {
  debug("called 'deleteTask' controller");
  try {
    const { taskId, projectId } = req.query;

    const project = await Project.findById(projectId);

    let taskGotRemoved = false;
    project.taskLists.forEach((taskList) => {
      const task = taskList.tasks.id(taskId);
      if (task) {
        task.remove();
        project.save();
        taskGotRemoved = true;
      }
    });

    if (taskGotRemoved) {
      return res.status(200).json({
        error: false,
        message: `task ${taskId} removed from project ${projectId}`,
      });
    }
    return res.status(404).json({
      error: true,
      message: `task ${taskId} was not found in project ${projectId}`,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = deleteTaskController;
