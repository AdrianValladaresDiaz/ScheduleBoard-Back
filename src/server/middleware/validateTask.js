const debug = require("debug")("SCHEDBORD:middleware/validate");
const { Task } = require("../../database/models/Task");

const validateTask = (req, res, next) => {
  debug("running task validation...");
  const task = req.body.data;
  const validation = Task.checkIfValid(task);

  if (validation.error) {
    debug(validation.error);

    return res.status(400).json({
      error: true,
      mesage: validation,
    });
  }
  return next();
};

module.exports = validateTask;
