import * as actionType from "../constants/restaurants.constants";
import {
  restaurantsRequest,
  restaurantsTransform,
} from "../../services/restaurants/restaurants.service";

export const getRestaurants = (location) => (dispatch) => {
  dispatch({ type: actionType.RESTAURANTS_REQUEST });

  setTimeout(() => {
    restaurantsRequest(location)
      .then(restaurantsTransform)
      .then((results) => {
        dispatch({ type: actionType.RESTAURANTS_SUCCESS, payload: results });
      })
      .catch((err) => {
        dispatch({
          type: actionType.RESTAURANTS_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      });
  }, 2000);
};
