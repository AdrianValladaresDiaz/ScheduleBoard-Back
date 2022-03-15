const debug = require("debug")("SCHEDBORD:controllers/createTask");

const { Project } = require("../../database/models/Project");
const { Task } = require("../../database/models/Task");

const createTaskController = async (req, res, next) => {
  try {
    debug("create task endpoint reached");
    const { projectId, taskListId, taskTitle } = req.query;
    debug(`params are: ${projectId}, ${taskListId}, ${taskTitle})}`);

    const project = await Project.findById(projectId);
    const taskList = project?.taskLists.id(taskListId);
    if (project && taskList) {
      const newTask = new Task({ title: taskTitle });
      taskList.tasks.push(newTask);
      project.save();
      return res.status(201).json({
        error: false,
        message: newTask,
      });
    }
    return res.status(404).json({
      error: true,
      message: "Couldn't find project",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = createTaskController;
