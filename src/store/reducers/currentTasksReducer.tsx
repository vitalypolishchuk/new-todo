import {
  ADD_CURRENT_TASK,
  SET_CURRENT_TASKS,
  DELETE_CURRENT_TASK,
  EDIT_CURRENT_TASK,
  DELETE_CURRENT_TASKS,
  EDIT_DIRECTORY_IN_CURRENT_TASKS,
  DELETE_CURRENT_TASKS_OF_DIRECTORY,
} from "../actionTypes";
import { deleteTaskType, taskType, editTasksDirType, deleteTasksOfDirType } from "../storeTypes";

const INITIAL_STATE: taskType[] = [];

type actionType = {
  type: string;
  payload?: taskType[] | taskType | deleteTaskType | editTasksDirType | deleteTasksOfDirType;
};

const currentTasksReducer = (state = INITIAL_STATE, action: actionType) => {
  switch (action.type) {
    case SET_CURRENT_TASKS:
      return action.payload;
    case DELETE_CURRENT_TASKS:
      return INITIAL_STATE;
    case ADD_CURRENT_TASK:
      return [...state, action.payload];
    case DELETE_CURRENT_TASK:
      return (() => {
        const { userId, taskId } = action.payload as deleteTaskType;
        return state.filter((task: taskType) => {
          return task.userId !== userId || task.info.taskId !== taskId;
        });
      })();
    case EDIT_CURRENT_TASK:
      return (() => {
        const { userId, info } = action.payload as taskType;
        return state.map((task: taskType) => {
          if (task.userId === userId && task.info.taskId === info.taskId) {
            return { ...task, info };
          }
          return task;
        });
      })();
    case EDIT_DIRECTORY_IN_CURRENT_TASKS:
      return (() => {
        const { prevDir, curDir } = action.payload as editTasksDirType;
        return state.map((task: taskType) => {
          if (prevDir === task.info.directory) {
            console.log(prevDir, task.info.directory);
            return { ...task, info: { ...task.info, directory: curDir } };
          }
          return task;
        });
      })();
    case DELETE_CURRENT_TASKS_OF_DIRECTORY:
      return (() => {
        const { directory } = action.payload as deleteTasksOfDirType;
        return state.filter((task: taskType) => {
          console.log(directory, task.info.directory);
          if (directory !== task.info.directory) {
            return task;
          }
        });
      })();
    default:
      return state;
  }
};

export default currentTasksReducer;
