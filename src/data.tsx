export const profiles = [
  {
    userId: "156721332123",
    userImg:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80",
    userName: "Vitalii",
    userDate: "5/22/2023",
  },
  {
    userId: "22312435434532",
    userImg:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80",
    userName: "Andrew",
    userDate: "5/22/2023",
  },
  {
    userId: "123123",
    userImg:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80",
    userName: "Andrew",
    userDate: "5/22/2023",
  },
  {
    userId: "213qsdads",
    userImg:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80",
    userName: "Andrew",
    userDate: "5/22/2023",
  },
  {
    userId: "gdfg123123",
    userImg:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80",
    userName: "Andrew",
    userDate: "5/22/2023",
  },
];

export const todos = [
  {
    userId: "156721332123",
    todos: {
      inProgress: [],
      done: [],
    },
  },
  {
    userId: "22312435434532",
    todos: {
      inProgress: [],
      done: [],
    },
  },
];

export type tasksType = {
  name: string;
  path: string;
};

export const tasks = [
  {
    name: "Today's Tasks",
    path: "Today's Tasks",
  },
  {
    name: "All tasks",
    path: "/",
  },
  {
    name: "Important tasks",
    path: "Important tasks",
  },
  {
    name: "Completed tasks",
    path: "Completed tasks",
  },
  {
    name: "Uncompleted tasks",
    path: "Uncompleted tasks",
  },
];

export const directories = [
  {
    name: "Main",
  },
  {
    name: "Additional",
  },
  {
    name: "Super",
  },
];

export const sortByArr = ["Order Added", "Earlier First", "Later First", "Completed First", "Uncompleted First"];
