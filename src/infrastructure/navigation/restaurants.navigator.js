import React from "react";
import { Text } from "react-native";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { RestaurantScreen } from "../../features/restaurants/screens/restaurants.screen";
import { RestaurantDetail } from "../../features/restaurants/screens/restaurantDetail.screen";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <RestaurantStack.Screen name="Restaurants" component={RestaurantScreen} />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetail}
      />
    </RestaurantStack.Navigator>
  );
};