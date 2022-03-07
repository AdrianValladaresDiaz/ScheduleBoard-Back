const notFound = require("./notFound");

describe("Given notFound controller", () => {
  describe("When it receives a request", () => {
    test("It should return a 404", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const req = {
        body: "whatever",
      };

      notFound(req, res, null);

      expect(res.json).toHaveBeenCalled();
    });
  });
});
