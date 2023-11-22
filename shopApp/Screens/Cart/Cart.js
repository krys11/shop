import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { Button } from "react-native-paper";

import { connect } from "react-redux";
import CartItem from "./CartItem";
import { SwipeListView } from "react-native-swipe-list-view";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import * as actions from "../../Redux/Actions/cartActions";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Cart = (props) => {
  const navigation = useNavigation();
  let toTalPrice = 0;
  props.cartItems.forEach((item) => {
    return (toTalPrice += item.product.item.price);
  });

  return (
    <>
      <Text style={styles.title}>Cart</Text>
      {props.cartItems.length > 0 ? (
        <>
          <SwipeListView
            data={props.cartItems}
            renderItem={(data) => <CartItem item={data} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenBtn}
                  onPress={() => props.removeFromCart(data.item)}
                >
                  <FontAwesome5Icon name="trash" color={"white"} size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            rightOpenValue={-80}
            stopRightSwipe={-80}
          />
          <View style={styles.bottomContainer}>
            <View>
              <Text style={{ fontSize: 20, color: "blue" }}>
                $ {Math.round(toTalPrice)}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginRight: 10 }}>
                <Button mode="outlined" onPress={() => props.clearCart()}>
                  Clear
                </Button>
              </View>
              <View>
                <Button
                  mode="outlined"
                  onPress={() => navigation.navigate("checkout")}
                >
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

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
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
  bottomContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  hiddenBtn: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    width: width / 2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
