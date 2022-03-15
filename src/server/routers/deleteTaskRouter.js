const express = require("express");
const deleteTaskController = require("../controllers/deleteTaskController");

const deleteTaskRouter = express.Router();

deleteTaskRouter.delete("/", deleteTaskController);

module.exports = deleteTaskRouter;
