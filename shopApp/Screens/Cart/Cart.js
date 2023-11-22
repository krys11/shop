import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { List, Avatar, Button } from "react-native-paper";

import { connect } from "react-redux";

const Cart = (props) => {
  let toTalPrice = 0;
  props.cartItems.forEach((item) => {
    return (toTalPrice += item.product.item.price);
  });

  return (
    <>
      <Text style={styles.title}>Cart</Text>
      {props.cartItems.length > 0 ? (
        <>
          <ScrollView>
            {props.cartItems.map((it) => (
              <View key={Math.random()} style={{ marginHorizontal: 20 }}>
                <List.Item
                  title={
                    <Text style={{ fontWeight: "bold" }}>
                      {it.product.item.name}
                    </Text>
                  }
                  left={() => (
                    <Avatar.Image
                      size={60}
                      source={{
                        uri: it.product.item.image
                          ? it.product.item.image
                          : "https://www.freepngimg.com/thumb/fifa/11-2-fifa-png-images.png",
                      }}
                    />
                  )}
                  right={() => (
                    <Text style={styles.price}>$ {it.product.item.price}</Text>
                  )}
                />
              </View>
            ))}
          </ScrollView>
          <View style={styles.bottomContainer}>
            <View>
              <Text style={{ fontSize: 20, color: "blue" }}>
                $ {Math.round(toTalPrice)}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginRight: 10 }}>
                <Button mode="outlined" onPress={() => ""}>
                  Clear
                </Button>
              </View>
              <View>
                <Button mode="outlined" onPress={() => ""}>
                  CheckOut
                </Button>
              </View>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.noProducts}>
          <Text style={styles.noProductsText}>Your cart is empty</Text>
          <Text>Add Product To Your To Get Started</Text>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5,
  },
  noProducts: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noProductsText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
});

export default connect(mapStateToProps, null)(Cart);
