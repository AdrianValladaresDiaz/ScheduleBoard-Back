const debug = require("debug")("SCHEDBORD:express-launcher");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const generalError = require("../middleware/generalError");
const notFound = require("../middleware/notFound");
const userProjectsRouter = require("../routers/userProjectsRouter");

const launchExpressApp = () => {
  debug("launching express app...");
  const app = express();
  app.use(
    cors({
      origin:
        "https://adrian-valladares-front-final-project-202201-bcn-murex.vercel.app/*",
    })
  );
  app.use(helmet());
  app.use(morgan("dev"));

  app.use("/userProjects", userProjectsRouter);

  app.use(notFound);
  app.use(generalError);

  return app;
};

module.exports = launchExpressApp;
