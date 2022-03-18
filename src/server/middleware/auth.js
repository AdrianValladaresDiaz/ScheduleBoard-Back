const jwt = require("jsonwebtoken");
const debug = require("debug")("SCHEDBORD:middleware:auth");

const auth = (req, res, next) => {
  try {
    const headerAuth = req.get("authorization");
    const token = headerAuth.replace("Bearer ", "");
    const verificationResult = jwt.verify(token, process.env.JWT_SECRET);
    if (verificationResult) {
      req.userInfo = { ...verificationResult };
      debug("token validated");
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = auth;
