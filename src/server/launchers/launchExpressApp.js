const debug = require("debug")("SCHEDBORD:express-launcher");
const express = require("express");

const launchExpressApp = () => {
  debug("launching express app...");
  const app = express();

  return app;
};

module.exports = launchExpressApp;
