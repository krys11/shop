import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductContainer from "../Screens/Products/ProductContainer";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={ProductContainer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

function HomeNavigator() {
  return <MyStack />;
}

export { HomeNavigator };
