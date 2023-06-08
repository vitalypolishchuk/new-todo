import { ADD_PROFILE, SET_PROFILES, DELETE_PROFILES, DELETE_PROFILE } from "../actionTypes";
import { profileType } from "../storeTypes";

const INITIAL_STATE: profileType[] = [];

type actionType = {
  type: string;
  payload?: profileType;
};

const profilesReducer = (state = INITIAL_STATE, action: actionType) => {
  switch (action.type) {
    case SET_PROFILES:
      return action.payload;
    case DELETE_PROFILES:
      return INITIAL_STATE;
    case DELETE_PROFILE:
      return state.filter(({ userId }: profileType) => {
        return action.payload?.userId !== userId;
      });
    case ADD_PROFILE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default profilesReducer;
