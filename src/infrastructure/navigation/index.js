import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useSelector } from "react-redux";

import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";

export const Navigation = () => {
  const authRedux = useSelector((state) => state.authStore);
  const { isAuth } = authRedux;
  return (
    <NavigationContainer>
      {isAuth ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
