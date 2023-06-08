import {
  SET_CURRENT_PROFILE,
  ADD_PROFILE,
  ADD_DIRECTORY,
  DELETE_DIRECTORY,
  EDIT_DIRECTORY,
  SET_CURRENT_DIRECTORIES,
  DELETE_CURRENT_DIRECTORY,
  EDIT_CURRENT_DIRECTORY,
  ADD_THEME,
  SET_PROFILES,
  SET_DIRECTORIES,
  ADD_CURRENT_DIRECTORY,
  SHOW_CREATE_PROFILE,
  SHOW_PROFILES,
  SHOW_NEW_TASK,
  SHOW_NEW_DIRECTORY,
  ADD_TASK,
  DELETE_TASK,
  SET_TASKS,
  ADD_CURRENT_TASK,
  DELETE_CURRENT_TASK,
  SET_CURRENT_TASKS,
  EDIT_TASK,
  EDIT_CURRENT_TASK,
  DELETE_PROFILES,
  DELETE_DIRECTORIES,
  DELETE_TASKS,
  DELETE_CURRENT_PROFILES,
  DELETE_CURRENT_DIRECTORIES,
  DELETE_CURRENT_TASKS,
  SHOW_LEFT_MENU,
  SHOW_RIGHT_MENU,
  EDIT_DIRECTORY_IN_CURRENT_TASKS,
  EDIT_DIRECTORY_IN_TASKS,
  DELETE_CURRENT_TASKS_OF_DIRECTORY,
  DELETE_TASKS_OF_DIRECTORY,
  DELETE_PROFILE,
  DELETE_DIRECTORIES_OF_PROFILE,
  DELETE_TASKS_OF_PROFILE,
} from "./actionTypes";
import { profileType, taskType, deleteTaskType, directoriesType, dirType, editDirType, editTasksDirType, deleteTasksOfDirType } from "./storeTypes";

export const showProfiles = (isShow: boolean) => {
  return { type: SHOW_PROFILES, payload: isShow };
};

export const showCreateProfile = (isShow: boolean) => {
  return { type: SHOW_CREATE_PROFILE, payload: isShow };
};

export const showLeftMenu = (isShow: boolean) => {
  return { type: SHOW_LEFT_MENU, payload: isShow };
};

export const showRightMenu = (isShow: boolean) => {
  return { type: SHOW_RIGHT_MENU, payload: isShow };
};

export const addDirectory = (payload: dirType) => {
  return { type: ADD_DIRECTORY, payload };
};

export const deleteDirectory = (directory: { userId: string; directory: string }) => {
  return { type: DELETE_DIRECTORY, payload: directory };
};

export const editDirectory = (payload: editDirType) => {
  return { type: EDIT_DIRECTORY, payload: payload };
};

export const setCurrentDirectories = (directory: directoriesType) => {
  return { type: SET_CURRENT_DIRECTORIES, payload: directory };
};

export const deleteCurrentDirectory = (directoryName: string) => {
  return { type: DELETE_CURRENT_DIRECTORY, payload: directoryName };
};

export const editCurrentDirectory = (titles: { prevTitle: string; title: string }) => {
  return { type: EDIT_CURRENT_DIRECTORY, payload: titles };
};

export const showNewTask = (isShow: boolean) => {
  return { type: SHOW_NEW_TASK, payload: isShow };
};

export const showNewDirectory = (isShow: boolean) => {
  return { type: SHOW_NEW_DIRECTORY, payload: isShow };
};

export const setProfiles = (profiles: profileType[]) => {
  return { type: SET_PROFILES, payload: profiles };
};

export const setDirectories = (directories: directoriesType[]) => {
  return { type: SET_DIRECTORIES, payload: directories };
};

export const addCurrentDirectory = (dirName: string) => {
  return { type: ADD_CURRENT_DIRECTORY, payload: dirName };
};

export const addCurrentProfile = (profile: profileType) => {
  return { type: SET_CURRENT_PROFILE, payload: profile };
};

export const addProfile = (profile: profileType) => {
  return { type: ADD_PROFILE, payload: profile };
};

export const setTasks = (tasks: taskType[]) => {
  return { type: SET_TASKS, payload: tasks };
};

export const addTask = (task: taskType) => {
  return { type: ADD_TASK, payload: task };
};

export const deleteTask = (task: deleteTaskType) => {
  return { type: DELETE_TASK, payload: task };
};

export const editTask = (task: taskType) => {
  return { type: EDIT_TASK, payload: task };
};

export const addCurrentTask = (task: taskType) => {
  return { type: ADD_CURRENT_TASK, payload: task };
};

export const deleteCurrentTask = (task: deleteTaskType) => {
  return { type: DELETE_CURRENT_TASK, payload: task };
};

export const editCurrentTask = (task: taskType) => {
  return { type: EDIT_CURRENT_TASK, payload: task };
};

export const setCurrentTasks = (tasks: taskType[]) => {
  return { type: SET_CURRENT_TASKS, payload: tasks };
};

export const editCurTasksDir = (dirs: editTasksDirType) => {
  return { type: EDIT_DIRECTORY_IN_CURRENT_TASKS, payload: dirs };
};

export const editTasksDir = (dirs: editTasksDirType) => {
  return { type: EDIT_DIRECTORY_IN_TASKS, payload: dirs };
};

export const deleteCurTasksOfDir = (directory: deleteTasksOfDirType) => {
  return { type: DELETE_CURRENT_TASKS_OF_DIRECTORY, payload: directory };
};

export const deleteTasksOfDir = (directory: deleteTasksOfDirType) => {
  return { type: DELETE_TASKS_OF_DIRECTORY, payload: directory };
};

export const addTheme = (theme: string) => {
  return { type: ADD_THEME, payload: theme };
};

export const deleteProfiles = () => {
  return { type: DELETE_PROFILES };
};

export const deleteProfile = (profile: profileType) => {
  return { type: DELETE_PROFILE, payload: profile };
};

export const deleteDirectories = () => {
  return { type: DELETE_DIRECTORIES };
};

export const deleteDirectoriesOfProfile = (userId: string) => {
  return { type: DELETE_DIRECTORIES_OF_PROFILE, payload: { userId } };
};

export const deleteTasks = () => {
  return { type: DELETE_TASKS };
};

export const deleteTasksOfProfile = (userId: string) => {
  return { type: DELETE_TASKS_OF_PROFILE, payload: { userId } };
};

export const deleteCurrentProfiles = () => {
  return { type: DELETE_CURRENT_PROFILES };
};

export const deleteCurrentDirectories = () => {
  return { type: DELETE_CURRENT_DIRECTORIES };
};

export const deleteCurrentTasks = () => {
  return { type: DELETE_CURRENT_TASKS };
};
