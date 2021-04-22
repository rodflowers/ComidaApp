import * as actionType from "../constants/auth.constants";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case actionType.CREATE_USER_REQUEST:
    case actionType.LOGIN_USER_REQUEST:
      return {
        loading: true,
        isAuth: false,
      };
    case actionType.LOGOUT_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuth: true,
      };
    case actionType.CREATE_USER_SUCCESS:
    case actionType.LOGIN_USER_SUCCESS:
    case actionType.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        user: action.payload,
      };
    case actionType.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: false,
        user: {},
      };
    case actionType.CREATE_USER_FAIL:
    case actionType.LOGIN_USER_FAIL:
    case actionType.LOGOUT_USER_FAIL:
      return {
        loading: false,
        isAuth: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
