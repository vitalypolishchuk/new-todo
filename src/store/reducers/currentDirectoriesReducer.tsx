import {
  SET_CURRENT_DIRECTORIES,
  ADD_CURRENT_DIRECTORY,
  DELETE_CURRENT_DIRECTORY,
  EDIT_DIRECTORY,
  EDIT_CURRENT_DIRECTORY,
  DELETE_CURRENT_DIRECTORIES,
} from "../actionTypes";
import { directoriesType, dirType } from "../storeTypes";

const INITIAL_STATE: directoriesType = {
  userId: "",
  directories: [],
};

type actionType = {
  type: string;
  payload?: directoriesType | string | { prevTitle: string; title: string };
};

const currentDirectoriesReducer = (state = INITIAL_STATE, action: actionType) => {
  switch (action.type) {
    case SET_CURRENT_DIRECTORIES:
      return action.payload;
    case DELETE_CURRENT_DIRECTORIES:
      return INITIAL_STATE;
    case ADD_CURRENT_DIRECTORY:
      return { ...state, directories: [...state.directories, action.payload] };
    case DELETE_CURRENT_DIRECTORY:
      return (() => {
        const updatedDirs = state.directories.filter((dirName) => dirName !== action.payload);
        return { ...state, directories: updatedDirs };
      })();
    case EDIT_CURRENT_DIRECTORY:
      const { prevTitle, title } = action.payload as { prevTitle: string; title: string };
      const updatedDirs = state.directories.map((dirName) => {
        if (dirName === prevTitle) {
          return title;
        }
        return dirName;
      });
      return { ...state, directories: updatedDirs };
    default:
      return state;
  }
};

export default currentDirectoriesReducer;
