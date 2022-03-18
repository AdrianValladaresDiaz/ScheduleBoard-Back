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

describe("Given the 'authentication' router", () => {
  describe("When it gets a request at 'authentication/register with a new and valid user", () => {
    test("Then that user should be added to the database", async () => {
      const app = launchExpressApp();
      const expectedMessage = "user created";
      const newUser = {
        name: "new user name",
        surname: "new user surname",
        password: "password",
        mail: "newmail@gmail.com",
      };

      const { body } = await request(app)
        .post("/authentication/register")
        .send({ data: newUser });

      expect(body.error).toBe(false);
      expect(body.message).toMatch(expectedMessage);

      const createdUser = User.find({ mail: newUser.mail });

      expect(createdUser).toBeTruthy();
    });
  });

  describe("When it gets a request at 'authentication/register with an existing user", () => {
    test("Then it should return a 409", async () => {
      const app = launchExpressApp();
      const expectedMessage = "user already exists";
      const newUser = {
        name: "new user name",
        surname: "new user surname",
        password: "password",
        mail: "mail@gmail.com",
      };

      const { body } = await request(app)
        .post("/authentication/register")
        .send({ data: newUser });

      expect(body.error).toBe(true);
      expect(body.message).toMatch(expectedMessage);
    });
  });
});
