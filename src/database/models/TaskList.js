const { Schema, model } = require("mongoose");
const { Joi } = require("express-validation");
const { TaskSchema, TaskJoiSchema } = require("./Task");

const TaskListSchema = new Schema({
  title: { type: String, required: true },
  tasks: { type: [TaskSchema] },
});

const TaskListJoiSchema = Joi.object({
  title: Joi.string().max(35).required(),
  tasks: Joi.array().items(TaskJoiSchema),
});

TaskListSchema.statics.checkIfValid = (obj) => TaskListJoiSchema.validate(obj);

const TaskList = model("TaskList", TaskListSchema);

module.exports = { TaskList, TaskListSchema, TaskListJoiSchema };
