const debug = require("debug")("SCHEDBORD:express-launcher");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const generalError = require("../middleware/generalError");
const notFound = require("../middleware/notFound");

const launchExpressApp = () => {
  debug("launching express app...");
  const app = express();

  app.use(helmet());
  app.use(morgan("dev"));

  app.use(notFound);
  app.use(generalError);

  return app;
};

module.exports = launchExpressApp;
