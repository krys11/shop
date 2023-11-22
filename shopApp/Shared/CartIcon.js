import { View, StyleSheet } from "react-native";
import React from "react";
import { Badge, Text } from "react-native-paper";

import { connect } from "react-redux";

const CartIcon = (props) => {
  return (
    <>
      {props.cartItems.length > 0 ? (
        <Badge style={styles.badge}>
          <Text style={styles.badgeTxt}>{props.cartItems.length}</Text>
        </Badge>
      ) : null}
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
  badge: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -4,
    right: -15,
  },
  badgeTxt: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    width: "100%",
  },
});

export default connect(mapStateToProps)(CartIcon);
