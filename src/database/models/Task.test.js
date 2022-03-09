const { Task } = require("./Task");

describe("Given a Task model", () => {
  describe("When validating an invalid object", () => {
    test("Then it should throw a validation error", () => {
      const invalidTask = { title: "task title", description: 4 };

      const checkResult = Task.checkIfValid(invalidTask);

      expect(checkResult).toHaveProperty("error");
    });
  });

  describe("When validating a valid object", () => {
    test("Then it should ", () => {
      const invalidTask = {
        title: "task title",
        description: "an arbitratily long description, in string form",
        workHours: 84,
        dueDate: Date(2022, 5, 21),
      };

      const checkResult = Task.checkIfValid(invalidTask);

      expect(checkResult).not.toHaveProperty("error");
    });
  });
});
