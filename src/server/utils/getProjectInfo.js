const { Project } = require("../../database/models/Project");

const getProjectInfo = async (projectId) => {
  const project = await Project.findById(projectId);
  if (project) {
    await project.populate("users");
    const users = [];
    project.users.forEach((user) => {
      const { name, surname, id } = user;
      users.push({ name, surname, id });
    });

    const { title, dueDate, id } = project;

    return { title, dueDate, id, users };
  }
};

module.exports = getProjectInfo;
