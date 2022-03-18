const debug = require("debug")("SCHEDBORD:middleware/validate");
const { User } = require("../../database/models/User");

const validateUser = (req, res, next) => {
  debug("running user validation...");
  const user = req.body.data;
  const validation = User.checkIfValid(user);

  if (validation.error) {
    debug(validation.error);

    return res.status(400).json({
      error: true,
      mesage: validation,
    });
  }
  return next();
};

module.exports = validateUser;
