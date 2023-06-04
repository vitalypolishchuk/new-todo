export const INITIAL_PROFILE = {
  userId: "",
  userName: "",
  userImg: "",
  userDate: "",
};

export type profileType = {
  userId: typeof INITIAL_PROFILE.userId;
  userName: typeof INITIAL_PROFILE.userName;
  userImg: typeof INITIAL_PROFILE.userImg;
  userDate: typeof INITIAL_PROFILE.userDate;
};

export type taskType = {
  userId: string;
  info: {
    taskId: string;
    title: string;
    date: string;
    description: string;
    directory: string;
    isImportant: boolean;
    isCompleted: boolean;
  };
};

export type deleteTaskType = {
  userId: string;
  taskId: string;
};

export type profileAndDirsType = profileType & {
  directories: string[];
  tasks: taskType[];
};

export type dirType = {
  userId: string;
  directory: string;
};

export type directoriesType = {
  userId: string;
  directories: string[];
};

export type editDirType = {
  userId: string;
  titles: { prevTitle: string; title: string };
};

export type themeType = string;

export type showComponentsType = {
  isShowCreateProfile: boolean;
  isShowProfiles: boolean;
  isShowNewTask: boolean;
  isShowNewDirectory: boolean;
  isShowLeftMenu: boolean;
  isShowRightMenu: boolean;
};

export type storeType = {
  currentProfile: profileType;
  profiles: profileType[];
  theme: themeType;
  showComponents: showComponentsType;
  directories: directoriesType[];
  currentDirectories: directoriesType;
  tasks: taskType[];
  currentTasks: taskType[];
};
