import * as actionType from "../constants/favourites.constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addFavourite = (restaurant, uid) => (dispatch) => {
  try {
    dispatch({
      type: actionType.ADD_FAVOURITES_REQUEST,
      payload: { restaurant, uid },
    });

    dispatch({ type: actionType.ADD_FAVOURITES_SUCCESS });
  } catch (err) {
    dispatch({
      type: actionType.ADD_FAVOURITES_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const deleteFavourite = (restaurant) => (dispatch) => {
  try {
    dispatch({
      type: actionType.DELETE_FAVOURITES_REQUEST,
      payload: restaurant,
    });

    dispatch({ type: actionType.DELETE_FAVOURITES_SUCCESS });
  } catch (err) {
    dispatch({
      type: actionType.DELETE_FAVOURITES_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const loadFavourite = (uid) => (dispatch) => {
  dispatch({
    type: actionType.LOAD_FAVOURITES_REQUEST,
  });

  AsyncStorage.getItem(`@favourites2-${uid}`)
    .then((storage) => {
      storage !== null
        ? dispatch({
            type: actionType.LOAD_FAVOURITES_SUCCESS,
            payload: JSON.parse(storage),
          })
        : dispatch({
            type: actionType.LOAD_FAVOURITES_SUCCESS,
            payload: [],
          });
    })
    .catch((e) =>
      dispatch({
        type: actionType.LOAD_FAVOURITES_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      })
    );
};
