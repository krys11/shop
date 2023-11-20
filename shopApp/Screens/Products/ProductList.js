import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import ProductCard from "./ProductCard";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const ProductList = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ width: "50%" }}
      onPress={() => navigation.navigate("Product Detail", { item: item })}
    >
      <View
        style={{
          width: width / 2,
          backgroundColor: "gainsboro",
        }}
      >
        <ProductCard item={item} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;
