import { View, Text, Button, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Input from "../../../Shared/Input";
import FormContainer from "../../../Shared/FormContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";

import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AuthGlobal from "../../../Context/store/AuthGlobal";

const countries = require("../../../assets/countries.json");

const { width } = Dimensions.get("window");

const Checkout = (props) => {
  const navigation = useNavigation();
  const context = useContext(AuthGlobal);

  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState("Afghanistan");
  const [phone, setPhone] = useState();
  const [user, setUser] = useState();
  const [userName, setUserName] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);

    if (context.stateUser.isAuthenticated) {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          if (res) {
            axios
              .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                headers: { Authorization: `Bearer ${res}` },
              })
              .then((user) => {
                setUser(context.stateUser.user.userId);
                console.log(user.data);
                setUserName(user.data.name);
              });
          } else {
            return;
          }
        })
        .catch((error) => console.log(error));
    } else {
      props.navigation.navigate("User");
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please Login to Checkout",
        text2: "",
      });
    }

    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    const data = {
      userName,
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
    return navigation.navigate("Payment", { data });
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
