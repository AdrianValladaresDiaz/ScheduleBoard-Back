require("dotenv").config();
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const connectToDataBase = require("../../database");
const { Project } = require("../../database/models/Project");
const { User } = require("../../database/models/User");
const launchExpressApp = require("../launchers/launchExpressApp");

const {
  fakeProject,
  fakeUser,
  fakeUser2,
  fakeUser3,
} = require("../utils/testingUtils");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectToDataBase(connectionString);
});

beforeEach(async () => {
  await Project.create(fakeProject);
  await User.create(fakeUser);
  await User.create(fakeUser2);
  await User.create(fakeUser3);
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

  describe("When it gets a request at 'authentication/login with valid credentials", () => {
    test("Then it should return a 200 and the token", async () => {
      const app = launchExpressApp();
      const payload = {
        mail: "papaya@gmail.com",
        password: "papaya",
      };
      const expectedResponse = {
        name: "my pass is papaya",
        surname: "my pass is papaya",
        mail: "papaya@gmail.com",
      };

      const { body } = await request(app)
        .post("/authentication/login")
        .send({ data: payload });
      const userInfo = jwt.decode(body.message.token);

      expect(body.error).toBe(false);
      expect(userInfo).toEqual(expect.objectContaining(expectedResponse));
    });
  });

  describe("When it gets a request at 'authentication/login with invalid credentials", () => {
    test("Then it should return a 200 and the token", async () => {
      const app = launchExpressApp();
      const payload = {
        mail: "papaya@gmail.com",
        password: "badPassword",
      };
      const expectedResponse = "user not found";

      const { body } = await request(app)
        .post("/authentication/login")
        .send({ data: payload });

      expect(body.error).toBe(true);
      expect(body.message).toBe(expectedResponse);
    });
  });
});
