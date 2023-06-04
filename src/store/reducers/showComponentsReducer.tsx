import { SHOW_CREATE_PROFILE, SHOW_PROFILES, SHOW_NEW_TASK, SHOW_NEW_DIRECTORY, SHOW_LEFT_MENU, SHOW_RIGHT_MENU } from "../actionTypes";
import { showComponentsType } from "../storeTypes";

const INITIAL_STATE: showComponentsType = {
  isShowCreateProfile: false,
  isShowProfiles: true,
  isShowNewTask: false,
  isShowNewDirectory: false,
  isShowLeftMenu: false,
  isShowRightMenu: false,
};

type actionType = {
  type: string;
  payload: boolean;
};

const showComponentsReducer = (state = INITIAL_STATE, action: actionType) => {
  switch (action.type) {
    case SHOW_CREATE_PROFILE:
      return { ...state, isShowCreateProfile: action.payload };
    case SHOW_PROFILES:
      return { ...state, isShowProfiles: action.payload };
    case SHOW_PROFILES:
      return { ...state, isShowProfiles: action.payload };
    case SHOW_NEW_TASK:
      return { ...state, isShowNewTask: action.payload };
    case SHOW_NEW_DIRECTORY:
      return { ...state, isShowNewDirectory: action.payload };
    case SHOW_LEFT_MENU:
      return { ...state, isShowLeftMenu: action.payload };
    case SHOW_RIGHT_MENU:
      return { ...state, isShowRightMenu: action.payload };
    default:
      return state;
  }
};

export default showComponentsReducer;
