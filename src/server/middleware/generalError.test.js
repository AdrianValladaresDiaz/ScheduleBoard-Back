const generalError = require("./generalError");

describe("Given generalError middleware", () => {
  describe("When it receives a request with an error with status and message", () => {
    test("Then the response.json method should be called", () => {
      const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };

      const error = {};

      const mockedRes = mockResponse();

      generalError(error, null, mockedRes, null);

      expect(mockedRes.json).toHaveBeenCalled();
    });
  });
});
