const express = require("express");
const deleteProjectController = require("../controllers/deleteTaskController.js");

const deleteTaskRouter = express.Router();

deleteTaskRouter.delete("/", deleteProjectController);

module.exports = deleteTaskRouter;
