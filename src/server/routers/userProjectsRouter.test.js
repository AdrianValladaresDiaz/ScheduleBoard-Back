require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const connectToDataBase = require("../../database");
const { Project } = require("../../database/models/Project");
const { User } = require("../../database/models/User");
const launchExpressApp = require("../launchers/launchExpressApp");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectToDataBase(connectionString);
});

beforeEach(async () => {
  await Project.create({
    _id: "6228d27843471fa6be08c26e",
    title: "Placeholder project 1",
    dueDate: "2009-02-15T00:00:00Z",
    users: ["6228c95243471fa6be08c26b"],
    taskLists: [
      {
        title: "valid title",
        tasks: [
          {
            title: "task title",
            description: "an arbitratily long description, in string form",
            workHours: 84,
            dueDate: "2009-02-15T00:00:00Z",
          },
          {
            title: "task title",
            description: "an arbitratily long description, in string form",
            workHours: 84,
            dueDate: "2009-02-15T00:00:00Z",
          },
          {
            title: "task title",
            description: "an arbitratily long description, in string form",
            workHours: 84,
            dueDate: "2009-02-15T00:00:00Z",
          },
        ],
      },
      {
        title: "valid title 2",
        tasks: [
          {
            title: "task title",
            description: "an arbitratily long description, in string form",
            workHours: 84,
            dueDate: "2009-02-15T00:00:00Z",
          },
          {
            title: "task title",
            description: "an arbitratily long description, in string form",
            workHours: 84,
            dueDate: "2009-02-15T00:00:00Z",
          },
          {
            title: "task title",
            description: "an arbitratily long description, in string form",
            workHours: 84,
            dueDate: "2009-02-15T00:00:00Z",
          },
        ],
      },
    ],
  });
  await User.create({
    _id: "6228c95243471fa6be08c26b",
    name: "user",
    surname: "userSurname",
    password: "password",
    mail: "mail@mail.uwu",
    projects: ["6228d27843471fa6be08c26e"],
  });
});

afterEach(async () => {
  await Project.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given the userProjects router", () => {
  describe("When it gets a request at '/userProjects' without auth token", () => {
    test("Then it should return a 401", async () => {
      const expectedMessage = `"headers.authorization" is required`;
      const app = launchExpressApp();

      const { body } = await request(app).get("/userProjects").expect(401);

      expect(body.message).toBe(expectedMessage);
    });
  });

  describe("When it gets a request at '/userProjects' with an invalid token", () => {
    test("Then it should return a 401 and message containing 'fails to match the required pattern:'", async () => {
      const expectedMessage = /.fails to match the required pattern./i;
      const invalidToken = "this is an invalid token";
      const app = launchExpressApp();

      const { body } = await request(app)
        .get("/userProjects")
        .set("authorization", invalidToken)
        .expect(401);

      expect(body.message).toMatch(expectedMessage);
    });
  });

  describe("When it gets a request at '/userProjects' with valid token", () => {
    test("Then it should return a 200 and message containing the home page info", async () => {
      const expectedMessage = {
        projects: [
          {
            title: "Placeholder project 1",
            dueDate: "2009-02-15T00:00:00.000Z",
            id: "6228d27843471fa6be08c26e",
            users: [
              {
                name: "user",
                surname: "userSurname",
                id: "6228c95243471fa6be08c26b",
              },
            ],
          },
        ],
      };
      const validToken =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlciIsInN1cm5hbWUiOiJ1c2VyU3VybmFtZSIsIm1haWwiOiJtYWlsQG1haWwudXd1IiwiYWxnIjoiSFMyNTYifQ.g7FYsSG-NxbMdqjrvJxfpZgPDh7ShdM0YmwYEC7GD7g";
      const app = launchExpressApp();

      const { body } = await request(app)
        .get("/userProjects")
        .set("authorization", validToken);
      // .expect(200);

      // console.log(body);
      expect(body.message).toEqual(expectedMessage);
    });
  });
});
