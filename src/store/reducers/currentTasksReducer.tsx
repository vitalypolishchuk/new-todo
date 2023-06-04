import { ADD_CURRENT_TASK, SET_CURRENT_TASKS, DELETE_CURRENT_TASK, EDIT_CURRENT_TASK, DELETE_CURRENT_TASKS } from "../actionTypes";
import { deleteTaskType, taskType } from "../storeTypes";

const INITIAL_STATE: taskType[] = [];

type actionType = {
  type: string;
  payload?: taskType[] | taskType | deleteTaskType;
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
    default:
      return state;
  }
};

export default currentTasksReducer;
