import { directories } from "../../data";
import { ADD_DIRECTORY, SET_DIRECTORIES, DELETE_DIRECTORY, EDIT_DIRECTORY, DELETE_DIRECTORIES, DELETE_DIRECTORIES_OF_PROFILE } from "../actionTypes";
import { directoriesType, dirType, editDirType } from "../storeTypes";

const INITIAL_STATE: directoriesType[] = [];

type actionType = {
  type: string;
  payload?: directoriesType[] | dirType | editDirType;
};

const directoriesReducer = (state = INITIAL_STATE, action: actionType) => {
  switch (action.type) {
    case SET_DIRECTORIES:
      return action.payload;
    case DELETE_DIRECTORIES:
      return INITIAL_STATE;
    case ADD_DIRECTORY:
      return (() => {
        const { userId, directory } = action.payload as { userId: string; directory: string };
        const existingDirectoryIndex = state.findIndex((dir) => dir.userId === userId);
        if (existingDirectoryIndex !== -1) {
          return state.map((dir, index) => {
            if (index === existingDirectoryIndex) {
              return {
                ...dir,
                directories: [...dir.directories, directory],
              };
            }
            return dir;
          });
        } else {
          const newDirectory = {
            userId,
            directories: [directory],
          };
          return [...state, newDirectory];
        }
      })();
    case DELETE_DIRECTORY:
      return (() => {
        const { userId, directory } = action.payload as { userId: string; directory: string };
        return state.map((dir) => {
          if (dir.userId === userId) {
            return {
              ...dir,
              directories: dir.directories.filter((name) => {
                return name !== directory;
              }),
            };
          }
          return dir;
        });
      })();
    case DELETE_DIRECTORIES_OF_PROFILE:
      return (() => {
        const { userId } = action.payload as { userId: string };
        return state.filter((dir) => {
          if (dir.userId !== userId) {
            return dir;
          }
        });
      })();
    case EDIT_DIRECTORY:
      const { userId, titles } = action.payload as editDirType;
      return state.map((dir) => {
        if (dir.userId === userId) {
          return {
            ...dir,
            directories: dir.directories.map((name) => {
              if (name === titles.prevTitle) {
                return titles.title;
              }
              return name;
            }),
          };
        }
        return dir;
      });
    default:
      return state;
  }
};

export default directoriesReducer;
