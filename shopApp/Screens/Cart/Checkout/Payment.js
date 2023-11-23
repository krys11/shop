import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const Payment = () => {
  const { params } = useRoute();
  const navigation = useNavigation();

  return (
    <View>
      <Text>Payment</Text>
      <Button
        title="Confirm"
        onPress={() => navigation.navigate("Confirm", { order: params.data })}
      />
    </View>
  );
};

export default Payment;
