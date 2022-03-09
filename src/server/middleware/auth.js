const jwt = require("jsonwebtoken");
const debug = require("debug")("SCHEDBORD:middleware:auth");

const auth = (req, res, next) => {
  try {
    const headerAuth = req.get("Authentication");
    if (!headerAuth) {
      const error = new Error("token missing");
      error.status = 401;
      return next(error);
    }
    const token = headerAuth.replace("Bearer", "");
    const verificationResult = jwt.verify(token, process.env.JWT_SECRET);
    if (verificationResult) {
      debug("woops");
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = auth;
