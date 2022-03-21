const debug = require("debug")("SCHEDBORD:controllers/createTaskList");
const { Project } = require("../../database/models/Project");
const { TaskList } = require("../../database/models/TaskList");

const createTaskListController = async (req, res, next) => {
  debug("endpoint reached");
  try {
    const { projectId } = req.query;

    const taskList = new TaskList(req.body.data);
    const project = await Project.findById(projectId);
    project.taskLists.push(taskList);

    return res.status(201).json({
      error: false,
      message: taskList,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = createTaskListController;
