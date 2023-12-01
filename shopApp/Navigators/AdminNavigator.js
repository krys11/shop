import { Text, View } from "react-native";
import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Order from "../Screens/Admin/Order";
import ProductForm from "../Screens/Admin/ProductForm";
import Products from "../Screens/Admin/Products";
import Categories from "../Screens/Admin/Categories";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          title: "Products",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Orders" component={Order} />
      <Stack.Screen name="ProductForm" component={ProductForm} />
    </Stack.Navigator>
  );
}
const AdminNavigator = () => {
  return <MyStack />;
};

export { AdminNavigator };
