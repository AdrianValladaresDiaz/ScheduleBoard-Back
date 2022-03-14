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

describe("Given the 'deleteTask' router", () => {
  describe("When it gets a request at '/deleteTask' with a task id and a project id", () => {
    test("Then it should delete that task and return a 200 with the appropiate message", async () => {
      const expectedMessage = `task 622c8ce820db0fae1c1bf49e removed from project 6228d27843471fa6be08c26e`;
      const expectedInitialLength = 3;
      const expectedFinalLength = 2;
      const app = launchExpressApp();
      const taskId = "622c8ce820db0fae1c1bf49e";
      const projectId = "6228d27843471fa6be08c26e";
      let project = await Project.findById(projectId);

      expect(project.taskLists[0].tasks.length).toBe(expectedInitialLength);

      const { body } = await request(app).delete("/deleteTask").query({
        taskId,
        projectId,
      });

      project = await Project.findById(projectId);
      expect(body.message).toBe(expectedMessage);
      expect(project.taskLists[0].tasks.length).toBe(expectedFinalLength);
    });
  });
});
