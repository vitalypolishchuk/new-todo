import {
  ADD_TASK,
  SET_TASKS,
  DELETE_TASK,
  EDIT_TASK,
  DELETE_TASKS,
  EDIT_DIRECTORY_IN_TASKS,
  DELETE_TASKS_OF_DIRECTORY,
  DELETE_TASKS_OF_PROFILE,
} from "../actionTypes";
import { taskType, deleteTaskType, editTasksDirType, deleteTasksOfDirType } from "../storeTypes";

const INITIAL_STATE: taskType[] = [];

type actionType = {
  type: string;
  payload: taskType | deleteTaskType | editTasksDirType | deleteTasksOfDirType;
};

const tasksReducer = (state = INITIAL_STATE, action: actionType) => {
  switch (action.type) {
    case SET_TASKS:
      return action.payload;
    case DELETE_TASKS:
      return INITIAL_STATE;
    case ADD_TASK:
      return [...state, action.payload];
    case DELETE_TASK:
      return (() => {
        const { userId, taskId } = action.payload as deleteTaskType;
        return state.filter((task: taskType) => {
          return task.userId !== userId || task.info.taskId !== taskId;
        });
      })();
    case DELETE_TASKS_OF_PROFILE:
      return (() => {
        const { userId } = action.payload as { userId: string };
        return state.filter((task: taskType) => {
          return task.userId !== userId;
        });
      })();
    case EDIT_TASK:
      return (() => {
        const { userId, info } = action.payload as taskType;
        return state.map((task: taskType) => {
          console.log(task.userId === userId && task.info.taskId === info.taskId, info);
          if (task.userId === userId && task.info.taskId === info.taskId) {
            return { ...task, info };
          }
          return task;
        });
      })();
    case EDIT_DIRECTORY_IN_TASKS:
      return (() => {
        const { prevDir, curDir } = action.payload as editTasksDirType;
        return state.map((task: taskType) => {
          if (prevDir === task.info.directory) {
            return { ...task, info: { ...task.info, directory: curDir } };
          }
          return task;
        });
      })();
    case DELETE_TASKS_OF_DIRECTORY:
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

export default tasksReducer;
