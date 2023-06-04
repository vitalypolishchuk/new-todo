import { combineReducers } from "redux";
import profilesReducer from "./reducers/profilesReducer";
import themeReducer from "./reducers/themeReducer";
import currentProfileReducer from "./reducers/currentProfileReducer";
import showComponentsReducer from "./reducers/showComponentsReducer";
import directoriesReducer from "./reducers/directoriesReducer";
import currentDirectoriesReducer from "./reducers/currentDirectoriesReducer";
import tasksReducer from "./reducers/tasksReducer";
import currentTasksReducer from "./reducers/currentTasksReducer";

export const rootReducer = combineReducers({
  profiles: profilesReducer,
  currentProfile: currentProfileReducer,
  theme: themeReducer,
  directories: directoriesReducer,
  currentDirectories: currentDirectoriesReducer,
  tasks: tasksReducer,
  currentTasks: currentTasksReducer,
  showComponents: showComponentsReducer,
});
