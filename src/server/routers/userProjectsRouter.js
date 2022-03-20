const { json } = require("express");
const express = require("express");
const createProjectController = require("../controllers/createProjectController");
const getUserProjectsController = require("../controllers/getUserProjectsController");
const auth = require("../middleware/auth");
const checkJwtHeader = require("../middleware/checkJwtHeader");
const validateProject = require("../middleware/validateProject");

const userProjectsRouter = express.Router();

userProjectsRouter.use(json());

userProjectsRouter.get("/", checkJwtHeader, auth, getUserProjectsController);
userProjectsRouter.post(
  "/",
  checkJwtHeader,
  auth,
  validateProject,
  createProjectController
);

module.exports = userProjectsRouter;
