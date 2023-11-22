import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Cart from "../Screens/Cart/Cart";
import { CheckoutNavigator } from "./CheckoutNavigator";

const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="checkout"
        component={CheckoutNavigator}
        options={{ headerTitle: "Checkout" }}
      />
    </Stack.Navigator>
  );
}

const CartNavigator = () => {
  return <MyTabs />;
};

export { CartNavigator };
