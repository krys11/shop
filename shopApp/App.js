import "react-native-gesture-handler";

import * as React from "react";
import { AppRegistry } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { name as appName } from "./app.json";
import Start from "./src";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Start />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
