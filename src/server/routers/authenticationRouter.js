const express = require("express");
const registerUserController = require("../controllers/registerUserController");
const validateUser = require("../middleware/validateUser");

const authenticationRouter = express.Router();

authenticationRouter.use(express.json());

authenticationRouter.post("/register", validateUser, registerUserController);

module.exports = authenticationRouter;
