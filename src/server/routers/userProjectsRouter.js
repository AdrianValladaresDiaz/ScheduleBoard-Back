const { json } = require("express");
const express = require("express");
const auth = require("../middleware/auth");
const checkJwtHeader = require("../middleware/checkJwtHeader");

const userProjectsRouter = express.Router();

userProjectsRouter.use(json());
userProjectsRouter.all("/", checkJwtHeader, auth);

module.exports = userProjectsRouter;
