const { Joi } = require("express-validation");
const debug = require("debug")("SCHEDBORD:middleware:checkJwtHeader");

const requestValidSchema = Joi.object({
  headers: Joi.object({
    authorization: Joi.string()
      .regex(/^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
      .required(),
  }).unknown(true),
}).unknown(true);

const checkJwtHeader = (req, res, next) => {
  const { error: validationError } = requestValidSchema.validate(req);
  if (validationError) {
    debug("found error validating jwt in request header");
    const error = new Error(validationError.details[0].message);
    error.status = 500;
    return next(error);
  }
  debug("validated headers successfully");
  return next();
};

module.exports = checkJwtHeader;
