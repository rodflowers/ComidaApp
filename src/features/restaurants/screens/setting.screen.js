import React from "react";
import { useDispatch } from "react-redux";

import { Button } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { logoutUser } from "../../../redux/actions/auth.action";

export const SettingsScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeArea>
      <Button title="Cerrar Sesión" onPress={() => dispatch(logoutUser())} />
    </SafeArea>
  );
};
