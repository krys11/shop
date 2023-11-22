import { View, Text, Button, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Input from "../../../Shared/Input";
import FormContainer from "../../../Shared/FormContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";

import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const countries = require("../../../assets/countries.json");

const { width } = Dimensions.get("window");

const Checkout = (props) => {
  const navigation = useNavigation();

  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState([]);
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState("");
  const [order, setOrder] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);

    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    console.log("orders", orderItems);
    const data = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: "3",
      user,
      zip,
    };
    setOrder(data);

    navigation.navigate("Payment", { order: order });
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraHeight={200}
      viewIsInsideTabBar={true}
    >
      <FormContainer title="Shopping Adress">
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Shipping Address 1"}
          name={"ShippingAddress1"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"Shipping Address 2"}
          name={"ShippingAddress2"}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={"City"}
          name={"city"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={"Zip Code"}
          name={"zip"}
          value={zip}
          keyboardType={"numeric"}
          onChangeText={(text) => setZip(text)}
        />
        {/* <Picker
          mode="dropdown"
          selectedValue={country}
          placeholder="Select Your Country"
          style={{ width: 500, height: 500 }}
          onValueChange={(val) => setCountry(val)}
        >
          {/* {countries.map((c) => {
            return <Picker.Item key={c.code} label={c.name} value={c.name} />;
          })} */}
        {/* </Picker> */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}> Select Pays</Text>
        </View>
        <Picker
          selectedValue={country}
          onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
          style={{ width: width - 80, marginHorizontal: 30 }}
          mode="dropdown"
          placeholder="Select Your Country"
        >
          {countries.map((c) => {
            return <Picker.Item key={c.code} label={c.name} value={c.name} />;
          })}
        </Picker>
        <View style={{ width: "80%", alignItems: "center" }}>
          <Button title="Confirm" onPress={() => checkOut()} />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(Checkout);
