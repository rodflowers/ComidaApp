import * as actionType from "../constants/auth.constants";
import * as eCode from "../constants/auth-errors.constants";
import firebase from "../../../firebase";

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: actionType.LOGIN_USER_REQUEST });

  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch({ type: actionType.LOGIN_USER_SUCCESS, payload: user });
    })
    .catch((err) => {
      console.log(err.code);
      dispatch({
        type: actionType.LOGIN_USER_FAIL,
        payload: errorCode(err.code),
      });
    });
};
export const createUser = (email, password, repassword) => async (dispatch) => {
  dispatch({ type: actionType.CREATE_USER_REQUEST });

  if (password !== repassword) {
    dispatch({
      type: actionType.CREATE_USER_FAIL,
      payload: eCode.PASSWORDS_DONT_MATCH,
    });
    return;
  }

  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch({ type: actionType.CREATE_USER_SUCCESS, payload: user });
    })
    .catch((err) => {
      console.log(err.code);
      dispatch({
        type: actionType.CREATE_USER_FAIL,
        payload: errorCode(err.code),
      });
    });
};

export const loadUserFromAuthState = (user) => (dispatch) => {
  dispatch({ type: actionType.LOAD_USER_SUCCESS, payload: user });
};

export const logoutUser = () => async (dispatch) => {
  dispatch({ type: actionType.LOGOUT_USER_REQUEST });

  await firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: actionType.LOGOUT_USER_SUCCESS });
    })
    .catch((err) => {
      console.log(err.code);
      dispatch({
        type: actionType.LOGOUT_USER_FAIL,
        payload: errorCode(err.code),
      });
    });
};

const errorCode = (errCode) => {
  switch (errCode) {
    case eCode.EMAIL_IN_USE:
      return eCode.EMAIL_IN_USE_TRANSLATE;
    case eCode.USER_DISABLED:
      return eCode.USER_DISABLED_TRANSLATE;
    case eCode.OP_NOT_ALLOWED:
      return eCode.OP_NOT_ALLOWED_TRANSLATE;
    case eCode.INVALID_EMAIL:
      return eCode.INVALID_EMAIL_TRANSLATE;
    case eCode.WRONG_PASS:
      return eCode.WRONG_PASS_TRANSLATE;
    case eCode.USER_NOT_FOUND:
      return eCode.USER_NOT_FOUND_TRANSLATE;
    case eCode.NETWORK_ERROR:
      return eCode.NETWORK_ERROR_TRANSLATE;
    case eCode.WEAK_PASS:
      return eCode.WEAK_PASS_TRANSLATE;
    case eCode.MISSING_EMAIL:
      return eCode.MISSING_EMAIL_TRANSALTE;
    case eCode.INTERNAL_ERROR:
      return eCode.INTERNAL_ERROR_TRANSLATE;
    case eCode.INVALID_CUSTOM_TOKEN:
      return eCode.INVALID_CUSTOM_TOKEN_TRANSLATE;
    case eCode.TOO_MANY_REQ:
      return eCode.TOO_MANY_REQ_TRANSLATE;
    default:
      return "ERROR NO ESPECIFICADO";
  }
};
