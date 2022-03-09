const { Schema, model } = require("mongoose");
const { Joi } = require("express-validation");
const { TaskSchema, TaskJoiSchema } = require("./Task");

const TaskListSchema = new Schema({
  title: { type: String, required: true },
  tasks: { type: [TaskSchema] },
});

TaskListSchema.statics.checkIfValid = (obj) => {
  const joiSchema = Joi.object({
    title: Joi.string().max(35).required(),
    tasks: Joi.array().items(TaskJoiSchema),
  });

  return joiSchema.validate(obj);
};

const TaskList = model("TaskList", TaskListSchema, "taskLists");

module.exports = { TaskList, TaskListSchema };
