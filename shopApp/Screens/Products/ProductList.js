import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import ProductCard from "./ProductCard";

const { width, height } = Dimensions.get("window");

const ProductList = ({ item }) => {
  return (
    <View>
      <TouchableOpacity style={{ width: "50%" }}>
        <View
          style={{
            width: width / 2,
            backgroundColor: "gainsboro",
          }}
        >
          <ProductCard item={item} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductList;
