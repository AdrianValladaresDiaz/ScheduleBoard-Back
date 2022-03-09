const { TaskList } = require("./TaskList");

describe("Given a TaskList model", () => {
  describe("When validating an invalid object", () => {
    test("Then it should throw a validation error", () => {
      const invalidTaskList = {
        title: "valid title",
        tasks: [1, 2, 3],
      };

      const checkResult = TaskList.checkIfValid(invalidTaskList);

      expect(checkResult).toHaveProperty("error");
    });
  });

  describe("When validating a valid object", () => {
    test("Then it should not throw a validation error", () => {
      const invalidTaskList = {
        title: "valid title",
        tasks: [
          {
            title: "task title",
            description: "an arbitratily long description, in string form",
            workHours: 84,
            dueDate: Date(2022, 5, 21),
          },
          {
            title: "task title 2",
            description: "an arbitratily long description, in string form",
            workHours: 84,
            dueDate: Date(2022, 5, 21),
          },
        ],
      };

      const checkResult = TaskList.checkIfValid(invalidTaskList);

      expect(checkResult).not.toHaveProperty("error");
    });
  });
});
