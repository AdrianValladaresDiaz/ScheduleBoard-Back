const { Schema, model } = require("mongoose");
const { Joi } = require("express-validation");

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  workHours: {
    type: Number,
  },
  dueDate: {
    type: Date,
  },
  assignedTo: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
});

TaskSchema.statics.checkIfValid = (obj) => {
  const joiSchema = Joi.object({
    title: Joi.string().max(35).required(),
    description: Joi.string(),
    workHours: Joi.number(),
    dueDate: Joi.date(),
  });

  return joiSchema.validate(obj);
};

const Task = model("Task", TaskSchema, "tasks");

module.exports = { Task, TaskSchema };
