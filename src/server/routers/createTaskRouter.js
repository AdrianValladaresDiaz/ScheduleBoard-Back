const express = require("express");
const createTaskController = require("../controllers/createTaskController");

const createTaskRouter = express.Router();

createTaskRouter.use(express.json());

createTaskRouter.all("/", createTaskController);

module.exports = createTaskRouter;
