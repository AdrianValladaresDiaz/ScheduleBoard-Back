const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const connectToDataBase = require("../../database");
const { Project } = require("../../database/models/Project");
const { fakeProject, fakeProjectReturn } = require("../utils/testingUtils");
const launchExpressApp = require("../launchers/launchExpressApp");
require("dotenv").config();

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
      const expectedProject = { ...fakeProjectReturn };
      const { body } = await request(app)
        .get(`/project?projectId=${correctProjectId}`)
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
        .get(`/project?projectId=${invalidId}`)
        .expect(404);

      expect(body.message).toBe(expectedMessage);
    });
  });

  describe("When it receives a post request at '/project/createTaskList' with correct info and header", () => {
    test("Then it should return 201 and the newly created taskList", async () => {
      const app = launchExpressApp();
      // eslint-disable-next-line no-underscore-dangle
      const correctProjectId = fakeProject._id;
      const data = { data: { title: "test title" } };
      const validToken =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlciIsInN1cm5hbWUiOiJ1c2VyU3VybmFtZSIsIm1haWwiOiJtYWlsQG1haWwudXd1IiwiYWxnIjoiSFMyNTYifQ.g7FYsSG-NxbMdqjrvJxfpZgPDh7ShdM0YmwYEC7GD7g";

      const { body } = await request(app)
        .post(`/project/createTaskList?projectId=${correctProjectId}`)
        .send(data)
        .set("authorization", validToken)
        .expect(201);

      expect(body.error).toBeFalsy();
      expect(body.message).toMatchObject(data.data);
    });
  });

  describe("When it receives a post request at '/project/createTaskList' with incorrect info and correct header", () => {
    test("Then it should return 400 and an error", async () => {
      const app = launchExpressApp();
      // eslint-disable-next-line no-underscore-dangle
      const correctProjectId = fakeProject._id;
      const badData = { data: { tutle: "test title" } };
      const validToken =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlciIsInN1cm5hbWUiOiJ1c2VyU3VybmFtZSIsIm1haWwiOiJtYWlsQG1haWwudXd1IiwiYWxnIjoiSFMyNTYifQ.g7FYsSG-NxbMdqjrvJxfpZgPDh7ShdM0YmwYEC7GD7g";

      const { body } = await request(app)
        .post(`/project/createTaskList?projectId=${correctProjectId}`)
        .send(badData)
        .set("authorization", validToken)
        .expect(400);

      expect(body.error).toBeTruthy();
    });
  });
  describe("When it receives a post request at '/project/createTaskList' with correct info but incorrect header", () => {
    test("Then it should return 401 and an error", async () => {
      const app = launchExpressApp();
      // eslint-disable-next-line no-underscore-dangle
      const correctProjectId = fakeProject._id;
      const badData = { data: { tutle: "test title" } };

      const { body } = await request(app)
        .post(`/project/createTaskList?projectId=${correctProjectId}`)
        .send(badData)
        .expect(401);

      expect(body.error).toBeTruthy();
    });
  });
});
