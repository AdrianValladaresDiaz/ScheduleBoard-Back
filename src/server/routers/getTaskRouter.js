const express = require("express");
const getTaskController = require("../controllers/getTaskController");

const getTaskRouter = express.Router();

getTaskRouter.use(express.json());

getTaskRouter.get("/", getTaskController);

module.exports = getTaskRouter;
