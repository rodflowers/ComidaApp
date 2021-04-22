import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";

import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";

import { Provider } from "react-redux";
import store from "./src/redux/store";

import { Navigation } from "./src/infrastructure/navigation";

import { FirebaseAuthState } from "./src/components/utility/firebase-auth-state.component";

import {
  useFonts as useOwsald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";

import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import {
  useFonts as useRoboto,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";

export default function App() {
  const [oswaldLoaded] = useOwsald({
    Oswald_400Regular,
  });
  const [robotoLoaded] = useRoboto({
    Roboto_400Regular,
  });
  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !robotoLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <FirebaseAuthState>
            <Navigation />
          </FirebaseAuthState>
        </Provider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
