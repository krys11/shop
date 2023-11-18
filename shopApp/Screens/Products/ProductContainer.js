import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
import { Searchbar, Icon } from "react-native-paper";
import Banner from "../../Shared/Banner";

const { height, width } = Dimensions.get("window");
const data = require("../../assets/data/products.json");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
    };
  }, []);

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  return (
    <SafeAreaView>
      <View style={{ width: "100%", alignItems: "center", marginVertical: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Searchbar
            style={{ width: "85%", backgroundColor: "gainsboro" }}
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
          />
          <TouchableOpacity onPress={onBlur}>
            <Icon source="close" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      {focus ? (
        <View>
          <SearchedProducts productsFiltered={productsFiltered} />
        </View>
      ) : (
        <View style={styles.container}>
          <View>
            <Banner />
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={products}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <ProductList key={item.id} item={item} />
              )}
              numColumns={2}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
    height: height,
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductContainer;
