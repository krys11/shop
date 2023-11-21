import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { Fragment } from "react";
import { List, Avatar } from "react-native-paper";

import { connect } from "react-redux";

const Cart = (props) => {
  return (
    <>
      <Text style={styles.title}>Cart</Text>
      <ScrollView>
        {props.cartItems.length > 0 ? (
          props.cartItems.map((it) => (
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
          ))
        ) : (
          <View style={styles.noProducts}>
            <Text style={styles.noProductsText}>Your cart is empty</Text>
            <Text>Add Product To Your To Get Started</Text>
          </View>
        )}
      </ScrollView>
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
});

export default connect(mapStateToProps, null)(Cart);

{
  /* <Text>Cart</Text>
      {props.cartItems.map((it) => (
        <Text key={Math.random()}> {it.product.item.name}</Text>
      ))} */
}
