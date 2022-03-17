const express = require("express");
const getTaskController = require("../controllers/getTaskController");
const modifyTaskController = require("../controllers/modifyTaskController");
const validateTask = require("../middleware/validateTask");

const taskRouter = express.Router();

taskRouter.use(express.json());

taskRouter.get("/", getTaskController);
taskRouter.put("/", validateTask, modifyTaskController);

module.exports = taskRouter;
