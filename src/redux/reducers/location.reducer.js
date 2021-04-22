import * as actionType from "../constants/location.constants";

export const getLocationReducer = (state = { Location: [] }, action) => {
  switch (action.type) {
    case actionType.SEARCH_LOCATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionType.SEARCH_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        Location: action.payload.data,
        keyword: action.payload.keyword,
      };
    case actionType.SEARCH_LOCATION_FAISEARCH_LOCATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
