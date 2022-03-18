const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const connectToDataBase = require("../../database");
const { Project } = require("../../database/models/Project");
const { User } = require("../../database/models/User");
const launchExpressApp = require("../launchers/launchExpressApp");
const { fakeProject, fakeUser } = require("../utils/testingUtils");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectToDataBase(connectionString);
});

beforeEach(async () => {
  await Project.create(fakeProject);
  await User.create(fakeUser);
});

afterEach(async () => {
  await Project.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given the 'updateTask' endpoint'", () => {
  describe("When it gets a put request at '/task' with a task id, a project id, and proper task data", () => {
    test("Then that task should be returned", async () => {
      const projectId = "6228d27843471fa6be08c26e";
      const taskId = "622c8db5cea9959b117bb1b5";
      const expectedTask = {
        id: "622c8db5cea9959b117bb1b5",
        assignedTo: [],
        title: "A totally new title",
        description: "A totally new description for task with task title 3",
        workHours: 84,
        dueDate: "2009-02-15T00:00:00.000Z",
      };

      const app = launchExpressApp();

      const { body } = await request(app)
        .put("/task")
        .send({
          params: { projectId, taskId },
          data: {
            title: "A totally new title",
            description: "A totally new description for task with task title 3",
          },
        })
        .expect(200);

      expect(body.error).toBeFalsy();
      expect(body.message).toEqual(expectedTask);
    });

    test("Then that task should be updated", async () => {
      const projectId = "6228d27843471fa6be08c26e";
      const taskId = "622c8db5cea9959b117bb1b5";
      const expectedTask = {
        assignedTo: [],
        title: "A totally new title",
        description: "A totally new description for task with task title 3",
        workHours: 84,
        dueDate: new Date("2009-02-15T00:00:00.000Z"),
      };

      const app = launchExpressApp();
      await request(app)
        .put("/task")
        .send({
          params: { projectId, taskId },
          data: {
            title: "A totally new title",
            description: "A totally new description for task with task title 3",
          },
        })
        .expect(200);

      const project = await Project.findById(projectId);
      // eslint-disable-next-line no-unused-vars
      let targetTask;
      project.taskLists.forEach((taskList) => {
        const task = taskList.tasks.id(taskId);
        if (task) {
          targetTask = {
            assignedTo: task.assignedTo,
            title: task.title,
            description: task.description,
            workHours: task.workHours,
            dueDate: task.dueDate,
          };
        }
      });

      expect(targetTask).toEqual(expectedTask);
    });
  });

  describe("When it gets a put request at '/task' with a task id, a project id, and invalid task data", () => {
    test("Then it should return a 400 and the task should not be updated", async () => {
      const projectId = "6228d27843471fa6be08c26e";
      const taskId = "622c8db5cea9959b117bb16e";
      const app = launchExpressApp();

      const { body } = await request(app)
        .put("/task")
        .send({
          params: { projectId, taskId },
          data: {
            tutle: "A totally new title",
            unknown: "A totally new description for task with task title 3",
          },
        });

      expect(body.error).toBeTruthy();
    });
  });
});
