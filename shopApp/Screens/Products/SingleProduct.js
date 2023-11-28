import { View, ScrollView, StyleSheet, Image, Button } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Text, List } from "react-native-paper";
import Toast from "react-native-toast-message";
import * as actions from "../../Redux/Actions/cartActions";

import { connect } from "react-redux";

const SingleProduct = (props) => {
  const { params } = useRoute();
  const [item, setItem] = useState(params.item);
  const [availab, setAvailab] = useState("");

  return (
    <>
      <ScrollView style={{ marginBottom: 50, padding: 5 }}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text variant="headlineMedium" style={styles.contentHeader}>
            {item.name}
          </Text>
          <Text variant="headlineMedium" style={styles.contentText}>
            {item.brand}
          </Text>
          {/* description */}
          <Text>{item.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.price}>$ {item.price}</Text>
        </View>
        <View style={styles.btnAdd}>
          <Button
            title="ADD"
            onPress={() => {
              props.addItemToCart(item),
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${item.name} added to Cart`,
                  text2: "Go to your cart to complete order",
                });
            }}
          />
        </View>
      </View>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    padding: 0,
    margin: 0,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 15,
  },
  contentText: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 25,
    margin: 20,
    color: "red",
  },
  btnAdd: {
    margin: 20,
  },
});

export default connect(null, mapDispatchToProps)(SingleProduct);
