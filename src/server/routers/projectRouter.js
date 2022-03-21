const express = require("express");
const createTaskListController = require("../controllers/createTaskListController");
const getProjectController = require("../controllers/getProjectController");
const auth = require("../middleware/auth");
const checkJwtHeader = require("../middleware/checkJwtHeader");
const validateTaskList = require("../middleware/validateTaskList");

const projectRouter = express.Router();

projectRouter.use(express.json());

projectRouter.get("/", getProjectController);
projectRouter.post(
  "/createTaskList",
  checkJwtHeader,
  auth,
  validateTaskList,
  createTaskListController
);

module.exports = projectRouter;
