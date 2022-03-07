const debug = require("debug")("SCHEDBORD:middleware:error");

// eslint-disable-next-line no-unused-vars
const generalError = (err, req, res, next) => {
  debug("~~~ Error ~~~");
  debug(err.message ?? "no error message");
  const status = err.status ?? 500;
  const message = err.message ? err.message : "no message";
  res.status(status).json({ error: true, message });
};

module.exports = generalError;
