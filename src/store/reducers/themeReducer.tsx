import { ADD_THEME } from "../actionTypes";
import { profileType, themeType } from "../storeTypes";

const INITIAL_STATE: themeType = "";

type actionType = {
  type: string;
  payload: themeType;
};

const themeReducer = (state = INITIAL_STATE, action: actionType) => {
  switch (action.type) {
    case ADD_THEME:
      return action.payload;
    default:
      return state;
  }
};

export default themeReducer;
