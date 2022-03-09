const { Schema, model } = require("mongoose");
const { Joi } = require("express-validation");
const { default: mongoose } = require("mongoose");
const { TaskListSchema, TaskListJoiSchema } = require("./TaskList");
Joi.objectId = require("joi-objectid")(Joi);

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  users: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  taskLists: {
    type: [TaskListSchema],
  },
});

ProjectSchema.statics.checkIfValid = (obj) => {
  const joiSchema = Joi.object({
    title: Joi.string().max(35).required(),
    dueDate: Joi.date(),
    users: Joi.array().items(Joi.objectId()),
    taskLists: Joi.array().items(TaskListJoiSchema),
  });

  return joiSchema.validate(obj);
};

const Project = model("Project", ProjectSchema, "projects");

module.exports = { ProjectSchema, Project };
