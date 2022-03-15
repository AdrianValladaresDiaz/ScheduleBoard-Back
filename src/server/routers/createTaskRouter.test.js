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

describe("Given the 'createTask' router", () => {
  describe("When it gets a request at '/createTask' with a projectId, taskListId and a task title", () => {
    test("Then it should create that task and return a 201", async () => {
      const app = launchExpressApp();

      const projectId = "6228d27843471fa6be08c26e";
      const taskListId = "622c8e4731b13e8c658120ca";
      const taskTitle = "testing task title";
      const initialNoTasks = 3;
      const finalNoTasks = 4;

      let project = await Project.findById(projectId);
      let taskList = project.taskLists.id(taskListId);
      expect(taskList.tasks).toHaveLength(initialNoTasks);

      await request(app)
        .post("/createTask")
        .query({
          projectId,
          taskListId,
          taskTitle,
        })
        .expect(201);

      project = await Project.findById(projectId);
      taskList = project.taskLists.id(taskListId);
      expect(taskList.tasks).toHaveLength(finalNoTasks);
    });
  });

  describe("When it gets a request at '/createTask' with invalid  projectId, taskListId and a task title", () => {
    test("Then it should return a 404", async () => {
      const app = launchExpressApp();

      const invalidProjectId = "6228d27843471fa6be08c27f";
      const taskListId = "622c8e4731b13e8c658120ca";
      const taskTitle = "testing task title";

      const { body } = await request(app)
        .post("/createTask")
        .query({
          projectId: invalidProjectId,
          taskListId,
          taskTitle,
        })
        .expect(404);

      expect(body.error).toBeTruthy();
    });
  });
});
