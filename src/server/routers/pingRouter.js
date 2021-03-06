const express = require("express");
const auth = require("../middleware/auth");
const checkJwtHeader = require("../middleware/checkJwtHeader");
const pong = require("../controllers/pong");

const pingRouter = express.Router();

pingRouter.all("/", checkJwtHeader, auth, pong);

module.exports = pingRouter;
