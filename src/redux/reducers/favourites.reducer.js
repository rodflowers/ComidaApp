import * as actionType from "../constants/favourites.constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveFavourites = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@favourites", jsonValue);
  } catch (e) {
    console.log("error storing", e);
  }
};

export const favouritesReducer = (state = { favourites: [] }, action) => {
  switch (action.type) {
    case actionType.ADD_FAVOURITES_REQUEST:
      saveFavourites([...state.favourites, action.payload]);
      return {
        ...state,
        loading: true,
        favourites: [...state.favourites, action.payload],
      };
    case actionType.DELETE_FAVOURITES_REQUEST:
      const newFavourites = state.favourites.filter(
        (x) => x.placeId !== action.payload.placeId
      );
      saveFavourites(newFavourites);
      return {
        ...state,
        loading: true,
        favourites: newFavourites,
      };
    case actionType.LOAD_FAVOURITES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actionType.LOAD_FAVOURITES_SUCCESS:
      return {
        ...state,
        loading: false,
        favourites: action.payload,
      };
    case actionType.ADD_FAVOURITES_SUCCESS:
    case actionType.DELETE_FAVOURITES_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionType.DELETE_FAVOURITES_FAIL:
    case actionType.LOAD_FAVOURITES_FAIL:
    case actionType.ADD_FAVOURITES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
