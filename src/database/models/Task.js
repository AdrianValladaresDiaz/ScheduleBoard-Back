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

const TaskJoiSchema = Joi.object({
  title: Joi.string().max(35).required(),
  description: Joi.string(),
  workHours: Joi.number(),
  dueDate: Joi.date(),
  assignedTo: Joi.array().items(Joi.string()),
});

TaskSchema.statics.checkIfValid = (obj) => TaskJoiSchema.validate(obj);

const Task = model("Task", TaskSchema);

module.exports = { Task, TaskSchema, TaskJoiSchema };
