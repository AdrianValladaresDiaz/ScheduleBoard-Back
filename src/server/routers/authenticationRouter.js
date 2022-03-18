const express = require("express");
const loginUserController = require("../controllers/loginUserController");
const registerUserController = require("../controllers/registerUserController");
const validateUser = require("../middleware/validateUser");

const authenticationRouter = express.Router();

authenticationRouter.use(express.json());

authenticationRouter.post("/register", validateUser, registerUserController);
authenticationRouter.post("/login", loginUserController);

module.exports = authenticationRouter;
