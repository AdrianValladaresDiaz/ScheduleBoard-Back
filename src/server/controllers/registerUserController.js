const debug = require("debug")("SCHEDBORD:controllers/register");
const { User } = require("../../database/models/User");
const { encryptString } = require("../utils/crypto");

const registerUserController = async (req, res, next) => {
  try {
    debug("Register endpoint reached");
    const { mail, name, surname, password } = req.body.data;
    debug(`attempting to register user mail: ${mail}`);

    const existingUser = await User.findOne({ mail });
    if (existingUser) {
      return res.status(409).json({
        error: true,
        message: "user already exists",
      });
    }

    const encryptedPassword = await encryptString(password);
    const mongoUser = new User({
      mail,
      name,
      surname,
      password: encryptedPassword,
    });
    await mongoUser.save();

    return res.status(201).json({ error: false, message: "user created" });
  } catch (error) {
    return next(error);
  }
};

module.exports = registerUserController;
