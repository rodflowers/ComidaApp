import * as actionType from "../constants/restaurants.constants";

export const getRestaurantsReducer = (
  state = { listRestaurants: [] },
  action
) => {
  switch (action.type) {
    case actionType.RESTAURANTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionType.RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        listRestaurants: action.payload,
      };
    case actionType.RESTAURANTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
