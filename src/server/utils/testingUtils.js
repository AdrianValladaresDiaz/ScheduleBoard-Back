const fakeProject = {
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
};

const fakeUser = {
  _id: "6228c95243471fa6be08c26b",
  name: "user",
  surname: "userSurname",
  password: "password",
  mail: "mail@mail.uwu",
  projects: ["6228d27843471fa6be08c26e"],
};

module.exports = { fakeProject, fakeUser };
