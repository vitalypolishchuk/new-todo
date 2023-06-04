import { ADD_TASK, SET_TASKS, DELETE_TASK, EDIT_TASK, DELETE_TASKS } from "../actionTypes";
import { taskType, deleteTaskType } from "../storeTypes";

const INITIAL_STATE: taskType[] = [];

type actionType = {
  type: string;
  payload: taskType | deleteTaskType;
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
    case EDIT_TASK:
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

export default tasksReducer;
