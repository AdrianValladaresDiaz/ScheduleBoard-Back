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

describe("Given the 'getTask' endpoint'", () => {
  describe("When it gets a request at '/task' with a task id and a project id", () => {
    test("Then it should return that task", async () => {
      const projectId = "6228d27843471fa6be08c26e";
      const taskId = "622c8db5cea9959b117bb1b5";
      const expectedTask = {
        id: "622c8db5cea9959b117bb1b5",
        assignedTo: [],
        title: "task title 3",
        description: "an arbitratily long description, in string form 3",
        workHours: 84,
        dueDate: "2009-02-15T00:00:00.000Z",
      };
      const app = launchExpressApp();

      const { body } = await request(app)
        .get("/task")
        .query({
          projectId,
          taskId,
        })
        .expect(200);

      expect(body.error).toBeFalsy();
      expect(body.message).toEqual(expectedTask);
    });
  });

  describe("When it gets a request at '/task' with a task that does not exist id and a project id", () => {
    test("Then it should return a 404", async () => {
      const projectId = "6228d27843471fa6be08c26e";
      const taskId = "622c8db5cea9959b117bb16e";
      const expectedMessage = "could not find task";
      const app = launchExpressApp();

      const { body } = await request(app)
        .get("/task")
        .query({
          projectId,
          taskId,
        })
        .expect(404);

      expect(body.error).toBeTruthy();
      expect(body.message).toMatch(expectedMessage);
    });
  });
});
