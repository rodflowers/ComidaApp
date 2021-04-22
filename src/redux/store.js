import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { getRestaurantsReducer } from "./reducers/restaurants.reducer";
import { getLocationReducer } from "./reducers/location.reducer";
import { favouritesReducer } from "./reducers/favourites.reducer";

const reducer = combineReducers({
  restaurantsReducer: getRestaurantsReducer,
  locationStore: getLocationReducer,
  favouriteStore: favouritesReducer,
});

const middleware = [thunk];

//* Crear store
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
