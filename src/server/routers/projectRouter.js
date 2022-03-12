const express = require("express");
const getProjectController = require("../controllers/getProjectController");

const projectRouter = express.Router();

projectRouter.use(express.json());

projectRouter.all("/", getProjectController);

module.exports = projectRouter;
