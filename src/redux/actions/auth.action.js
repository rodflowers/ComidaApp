import * as actionType from "../constants/auth.constants";
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
      dispatch({
        type: actionType.LOGIN_USER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    });
};
