const { Project } = require("./Project");

describe("Given a Project model", () => {
  describe("When validating an invalid object", () => {
    test("Then it should throw a validation error", () => {
      const invalidProject = {
        title: "test title",
        dueDate: "2009-02-15T00:00:00Z",
        users: ["6228c95243471fa6be08c26b"],
        taskList: "invalid task list",
      };

      const checkResult = Project.checkIfValid(invalidProject);

      expect(checkResult).toHaveProperty("error");
    });
  });

  describe("When validating a valid object", () => {
    test("Then it should not throw a validation error", () => {
      const validProject = {
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
      };

      const checkResult = Project.checkIfValid(validProject);

      console.log(checkResult);
      expect(checkResult).not.toHaveProperty("error");
    });
  });
});
