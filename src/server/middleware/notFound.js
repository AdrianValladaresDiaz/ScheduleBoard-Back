const debug = require("debug")("SCHEDBORD:middleware:notFound");

const notFound = (req, res, next) => {
  try {
    debug("request received for unknown endpoint:");
    debug(`${req.body}`);
    res.status(404).json({ error: true, message: "unknown endpoint" });
  } catch (error) {
    next(error);
  }
};

module.exports = notFound;
