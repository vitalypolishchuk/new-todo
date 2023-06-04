import { SET_CURRENT_PROFILE, DELETE_CURRENT_PROFILES } from "../actionTypes";
import { profileType } from "../storeTypes";
import { INITIAL_PROFILE } from "../storeTypes";

const INITIAL_STATE: profileType = INITIAL_PROFILE;

type actionType = {
  type: string;
  payload?: profileType;
};

const currentProfile = (state = INITIAL_STATE, action: actionType) => {
  switch (action.type) {
    case SET_CURRENT_PROFILE:
      return action.payload;
    case DELETE_CURRENT_PROFILES:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default currentProfile;
