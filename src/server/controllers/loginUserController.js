const debug = require("debug")("SCHEDBORD:controllers:login");

const jwt = require("jsonwebtoken");
const { User } = require("../../database/models/User");
const { comparePasswords } = require("../utils/crypto");

const loginUserController = async (req, res, next) => {
  debug("validating login");
  try {
    const { mail, password } = req.body.data;
    const user = await User.findOne({ mail });
    if (user) {
      const passwordIsCorrect = await comparePasswords(password, user.password);

      if (passwordIsCorrect) {
        const userInfo = {
          name: user.name,
          surname: user.surname,
          mail: user.mail,
        };

        const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
          expiresIn: 1000 * 60 * 60 * 24 * 7,
        });
        return res.status(200).json({ error: false, message: { token } });
      }
    }

    return res.status(401).json({
      error: true,
      message: "user not found",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = loginUserController;
