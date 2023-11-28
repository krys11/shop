import { View, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import ProductCard from "./ProductCard";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const ProductList = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ width: "50%" }}
      onPress={() =>
        navigation.navigate("Product Details", { item: props.item })
      }
    >
      <View
        style={{
          width: width / 2,
          backgroundColor: "gainsboro",
        }}
      >
        <ProductCard item={props.item} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;
