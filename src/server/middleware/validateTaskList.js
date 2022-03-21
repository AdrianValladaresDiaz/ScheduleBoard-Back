const debug = require("debug")("SCHEDBORD:middleware/validate");
const { TaskList } = require("../../database/models/TaskList");

const validateTaskList = (req, res, next) => {
  debug("running task validation...");
  const taskList = req.body.data;
  const validation = TaskList.checkIfValid(taskList);

  if (validation.error) {
    debug(validation.error);

    return res.status(400).json({
      error: true,
      mesage: validation,
    });
  }
  return next();
};

module.exports = validateTaskList;
