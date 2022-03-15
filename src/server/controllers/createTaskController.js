const debug = require("debug")("SCHEDBORD:controllers/createTask");

const { Project } = require("../../database/models/Project");
const { Task } = require("../../database/models/Task");

const createTaskController = async (req, res, next) => {
  debug("create task endpoint reached");
  const { projectId, taskListId, taskTitle } = req.query;
  debug(`params ara ${(projectId, taskListId, taskTitle)}`);

  const project = await Project.findById(projectId);

  // const taskList = project.taskLists.id(taskListId);

  // const newTask = new Task({ title: taskTitle });
  next();
};

module.exports = createTaskController;
