const { Schema, model } = require("mongoose");
const { Joi } = require("express-validation");
const { default: mongoose } = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  projects: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
});

UserSchema.statics.checkIfValid = (obj) => {
  const joiSchema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    password: Joi.string().required(),
    mail: Joi.string().required(),
    projects: Joi.array().items(Joi.objectId()),
  });
  return joiSchema.validate(obj);
};

const User = model("User", UserSchema, "users");

module.exports = { UserSchema, User };
