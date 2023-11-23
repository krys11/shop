import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import React from "react";
import FormContainer from "../../../Shared/FormContainer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { List, Avatar } from "react-native-paper";

import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/cartActions";

const Confirm = (props) => {
  const { params } = useRoute();
  const navigation = useNavigation();

  const confirm = () => {
    setTimeout(() => {
      props.clearCart();
      navigation.navigate("cart");
    }, 500);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <FormContainer title="Confirm Order">
        {params?.order ? (
          <>
            <View style={styles.viewContainer}>
              <Text style={{ marginTop: 5, fontWeight: "bold" }}>
                Shipping To:
              </Text>
              <View style={{ padding: 10 }}>
                <Text>Adress: {params.order.shippingAddress1}</Text>
                <Text>Adress2: {params.order.shippingAddress1}</Text>
                <Text>Phone: {params.order.phone}</Text>
                <Text>City: {params.order.city}</Text>
                <Text>Zip Code: {params.order.zip}</Text>
                <Text>Country: {params.order.country}</Text>
              </View>
              <Text style={{ marginTop: 10, fontWeight: "bold" }}>Items:</Text>
              {props.cartItems.map((data) => (
                <List.Item
                  key={Math.random()}
                  style={{ paddingHorizontal: 20 }}
                  title={
                    <Text style={{ fontWeight: "bold" }}>
                      {data.product.item.name}
                    </Text>
                  }
                  left={() => (
                    <Avatar.Image
                      size={30}
                      source={{
                        uri: data.product.item.image
                          ? data.product.item.image
                          : "https://www.freepngimg.com/thumb/fifa/11-2-fifa-png-images.png",
                      }}
                    />
                  )}
                  right={() => (
                    <Text style={styles.price}>
                      $ {data.product.item.price}
                    </Text>
                  )}
                />
              ))}
            </View>
          </>
        ) : null}
        <View style={{ marginTop: 10 }}>
          <Button title="Confirm Order" onPress={confirm} />
        </View>
      </FormContainer>
    </ScrollView>
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
  };
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  viewContainer: {
    borderWidth: 1,
    borderColor: "orange",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  price: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
