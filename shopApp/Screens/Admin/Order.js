import { View, FlatList } from "react-native";
import React, { useCallback, useState } from "react";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import OrderCard from "../../Shared/OrderCard";
import { useFocusEffect } from "@react-navigation/native";

const Order = (props) => {
  const [orderList, setOrderList] = useState();

  useFocusEffect(
    useCallback(() => {
      getOrders();
      return () => {
        setOrderList();
      };
    }, [])
  );

  const getOrders = () => {
    axios
      .get(`${baseURL}orders`)
      .then((x) => {
        setOrderList(x.data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <View>
      <FlatList
        data={orderList}
        renderItem={({ item }) => (
          <OrderCard navigation={props.navigation} {...item} editMode={true} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Order;
