import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
import { Searchbar, Icon } from "react-native-paper";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

const { height, width } = Dimensions.get("window");

const data = require("../../assets/data/products.json");
const productsCategories = require("../../assets/data/categories.json");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [initialState, setInitialState] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [focus, setFocus] = useState();
  const [active, setActive] = useState();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setCategories(productsCategories);
    setActive(-1);
    setInitialState(data);
    setProductsCtg(data);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setActive();
      setCategories([]);
      setInitialState([]);
    };
  }, []);

  const searchProduct = (text) => {
    setSearchValue(text);
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setSearchValue("");
    setFocus(false);
  };

  //categories
  const changeCtg = (ctg) => {
    if (ctg === "all") {
      [setProductsCtg(initialState), setActive(true)];
    } else {
      [
        setProductsCtg(products.filter((i) => i.category.$oid === ctg)),
        setActive(true),
      ];
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: width, alignItems: "center", marginVertical: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Searchbar
            style={{ width: "85%", backgroundColor: "gainsboro" }}
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
            value={searchValue}
          />
          <TouchableOpacity
            onPress={onBlur}
            style={{ position: "absolute", right: 15 }}
          >
            <Icon source="close" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      {focus ? (
        <View>
          <SearchedProducts productsFiltered={productsFiltered} />
        </View>
      ) : (
        <ScrollView>
          <View>
            <Banner />
          </View>
          <View>
            <CategoryFilter
              categories={categories}
              categoryFilter={changeCtg}
              productsCtg={productsCtg}
              active={active}
              setActive={setActive}
            />
          </View>
          {productsCtg.length > 0 ? (
            <View style={styles.listContainer}>
              {productsCtg.map((item) => {
                return <ProductList item={item} key={item._id.$oid} />;
              })}
            </View>
          ) : (
            <View style={styles.noProduct}>
              <Text style={{ fontSize: 20 }}>No Products</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "white",
    height: height,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
    flex: 1,
  },
  noProduct: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 200,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductContainer;
