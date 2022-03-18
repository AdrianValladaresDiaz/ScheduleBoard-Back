const fakeProject = {
  __v: 0,
  _id: "6228d27843471fa6be08c26e",
  title: "Placeholder project 1",
  dueDate: "2009-02-15T00:00:00.000Z",
  users: ["6228c95243471fa6be08c26b"],
  taskLists: [
    {
      _id: "622c8e4731b13e8c658120ca",
      title: "valid title",
      tasks: [
        {
          _id: "622c8ce820db0fae1c1bf49e",
          assignedTo: [],
          title: "task title 1",
          description: "an arbitratily long description, in string form 1",
          workHours: 84,
          dueDate: "2009-02-15T00:00:00.000Z",
        },
        {
          _id: "622c8db5cea9959b117bb1b4",
          assignedTo: [],
          title: "task title 2",
          description: "an arbitratily long description, in string form 2",
          workHours: 84,
          dueDate: "2009-02-15T00:00:00.000Z",
        },
        {
          _id: "622c8db5cea9959b117bb1b5",
          assignedTo: [],
          title: "task title 3",
          description: "an arbitratily long description, in string form 3",
          workHours: 84,
          dueDate: "2009-02-15T00:00:00.000Z",
        },
      ],
    },
    {
      _id: "622c8e4731b13e8c658120ce",
      title: "valid title 2",
      tasks: [
        {
          _id: "622c8df95a8ee80141edf60b",
          assignedTo: [],
          title: "task title 1",
          description: "an arbitratily long description, in string form 1",
          workHours: 84,
          dueDate: "2009-02-15T00:00:00.000Z",
        },
        {
          _id: "622c8df95a8ee80141edf60c",
          assignedTo: [],
          title: "task title 2",
          description: "an arbitratily long description, in string form 2",
          workHours: 84,
          dueDate: "2009-02-15T00:00:00.000Z",
        },
        {
          _id: "622c8df95a8ee80141edf60d",
          assignedTo: [],
          title: "task title 3",
          description: "an arbitratily long description, in string form 3",
          workHours: 84,
          dueDate: "2009-02-15T00:00:00.000Z",
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
  mail: "mail@gmail.com",
  projects: ["6228d27843471fa6be08c26e"],
};

const fakeUser2 = {
  _id: "6228c95243471fa6be08c26c",
  name: "user",
  surname: "userSurname",
  password: "password",
  mail: "mail@mail.uwu",
  projects: ["6228d27843471fa6be08c26e"],
};

const fakeProjectReturn = {
  id: "6228d27843471fa6be08c26e",
  title: "Placeholder project 1",
  dueDate: "2009-02-15T00:00:00.000Z",
  users: ["6228c95243471fa6be08c26b"],
  taskLists: [
    {
      id: "622c8e4731b13e8c658120ca",
      title: "valid title",
      tasks: [
        {
          id: "622c8ce820db0fae1c1bf49e",
          assignedTo: [],
          title: "task title 1",
          description: "an arbitratily long description, in string form 1",
          workHours: 84,
          dueDate: "2009-02-15T00:00:00.000Z",
        },
        {
          id: "622c8db5cea9959b117bb1b4",
          assignedTo: [],
          title: "task title 2",
          description: "an arbitratily long description, in string form 2",
          workHours: 84,
          dueDate: "2009-02-15T00:00:00.000Z",
        },
        {
          id: "622c8db5cea9959b117bb1b5",
          assignedTo: [],
          title: "task title 3",
          description: "an arbitratily long description, in string form 3",
          workHours: 84,
          dueDate: "2009-02-15T00:00:00.000Z",
        },
      ],
    },
    {
      id: "622c8e4731b13e8c658120ce",
      title: "valid title 2",
      tasks: [
        {
          id: "622c8df95a8ee80141edf60b",
          assignedTo: [],
          title: "task title 1",
          description: "an arbitratily long description, in string form 1",
          workHours: 84,
          dueDate: "2009-02-15T00:00:00.000Z",
        },
        {
          id: "622c8df95a8ee80141edf60c",
          assignedTo: [],
          title: "task title 2",
          description: "an arbitratily long description, in string form 2",
          workHours: 84,
          dueDate: "2009-02-15T00:00:00.000Z",
        },
        {
          id: "622c8df95a8ee80141edf60d",
          assignedTo: [],
          title: "task title 3",
          description: "an arbitratily long description, in string form 3",
          workHours: 84,
          dueDate: "2009-02-15T00:00:00.000Z",
        },
      ],
    },
  ],
};

module.exports = {
  fakeProject,
  fakeUser,
  fakeProjectReturn,
  fakeUserUwu: fakeUser2,
};
