import * as actionType from "../constants/auth.constants";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case actionType.LOGIN_USER_REQUEST:
      return {
        loading: true,
        isAuth: false,
      };
    case actionType.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        user: action.payload,
      };
    case actionType.LOGIN_USER_FAIL:
      return {
        loading: false,
        isAuth: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
