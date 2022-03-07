const debug = require("debug")("SCHEDBORD:express-launcher");
const express = require("express");
const generalError = require("../middleware/generalError");
const notFound = require("../middleware/notFound");

const launchExpressApp = () => {
  debug("launching express app...");
  const app = express();

  app.use(notFound);
  app.use(generalError);

  return app;
};

module.exports = launchExpressApp;
