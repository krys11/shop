import { Text, View } from "react-native";
import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Order from "../Screens/Admin/Order";
import ProductForm from "../Screens/Admin/ProductForm";
import Products from "../Screens/Admin/Products";
import Categories from "../Screens/Admin/Categories";

const stack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <View>
      <Text>AdminNavigator</Text>
    </View>
  );
};

export default AdminNavigator;
