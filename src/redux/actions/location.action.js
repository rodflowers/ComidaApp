import * as actionType from "../constants/location.constants";

import {
  locationRequest,
  locationTransform,
} from "../../services/location/location.service";

export const getLocations = (searchKeyword = "Antwerp") => (dispatch) => {
  dispatch({ type: actionType.SEARCH_LOCATION_REQUEST });

  locationRequest(searchKeyword.toLowerCase())
    .then(locationTransform)
    .then((result) => {
      dispatch({
        type: actionType.SEARCH_LOCATION_SUCCESS,
        payload: {
          data: result,
          keyword: searchKeyword,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: actionType.SEARCH_LOCATION_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    });
};
