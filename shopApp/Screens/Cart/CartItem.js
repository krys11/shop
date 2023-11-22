import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { List, Avatar } from "react-native-paper";

const CartItem = (props) => {
  const data = props.item.item.product.item;
  const [quantity, setQuantity] = useState(
    props.item.item.product.item.quantity
  );

  return (
    <List.Item
      style={{ backgroundColor: "white", paddingHorizontal: 20 }}
      title={<Text style={{ fontWeight: "bold" }}>{data.name}</Text>}
      left={() => (
        <Avatar.Image
          size={60}
          source={{
            uri: data.image
              ? data.image
              : "https://www.freepngimg.com/thumb/fifa/11-2-fifa-png-images.png",
          }}
        />
      )}
      right={() => <Text style={styles.price}>$ {data.price}</Text>}
    />
  );
};

const styles = StyleSheet.create({
  price: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default CartItem;
