import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const Payment = () => {
  const { params } = useRoute();

  console.log(params);

  return (
    <View>
      <Text>Payment</Text>
    </View>
  );
};

export default Payment;
