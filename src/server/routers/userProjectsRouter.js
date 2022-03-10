const { json } = require("express");
const express = require("express");
const getUserProjectsController = require("../controllers/getUserProjectsController");
const auth = require("../middleware/auth");
const checkJwtHeader = require("../middleware/checkJwtHeader");

const userProjectsRouter = express.Router();

userProjectsRouter.use(json());

userProjectsRouter.get("/", checkJwtHeader, auth, getUserProjectsController);

module.exports = userProjectsRouter;
