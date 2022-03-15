const express = require("express");
const deleteTaskController = require("../controllers/deleteTaskController.js");

const deleteTaskRouter = express.Router();

deleteTaskRouter.delete("/", deleteTaskController);

module.exports = deleteTaskRouter;
