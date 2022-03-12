const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const connectToDataBase = require("../../database");
const { Project } = require("../../database/models/Project");
const { fakeProject } = require("../utils/testingUtils");
const launchExpressApp = require("../launchers/launchExpressApp");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectToDataBase(connectionString);
});

beforeEach(async () => {
  await Project.create(fakeProject);
});

afterEach(async () => {
  await Project.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given projectRouter endpoint", () => {
  describe("When it receives a request at '/project' with a correct projectId", () => {
    test("Then it should return that project", async () => {
      const app = launchExpressApp();
      // eslint-disable-next-line no-underscore-dangle
      const correctProjectId = fakeProject._id;
      const expectedProject = { ...fakeProject };
      const { body } = await request(app)
        .get("/project")
        .send({ projectId: correctProjectId })
        .expect(200);

      expect(body.message).toEqual(expectedProject);
    });
  });

  describe("When it receives a request at '/project' with an incorrect projectId", () => {
    test("Then it should return 404 and message 'couldnt find project'", async () => {
      const app = launchExpressApp();
      const invalidId = "6228d27843471fa6be08c26f";
      const expectedMessage = "couldn't find project";

      const { body } = await request(app)
        .get("/project")
        .send({ projectId: invalidId })
        .expect(404);

      expect(body.message).toBe(expectedMessage);
    });
  });
});
