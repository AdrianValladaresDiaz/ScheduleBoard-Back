const express = require("express");
const getTaskController = require("../controllers/getTaskController");
const modifyTaskController = require("../controllers/modifyTaskController");

const taskRouter = express.Router();

taskRouter.use(express.json());

taskRouter.get("/", getTaskController);
taskRouter.put("/", modifyTaskController);

module.exports = taskRouter;
