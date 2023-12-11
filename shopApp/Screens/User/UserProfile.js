import React, { useContext, useState, useCallback } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.ations";

const UserProfile = (props) => {
  const navigation = useNavigation();
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        navigation.navigate("Login");
      }

      AsyncStorage.getItem("jwt")
        .then((res) => {
          if (res) {
            axios
              .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                headers: { Authorization: `Bearer ${res}` },
              })
              .then((user) => setUserProfile(user.data));
          } else {
            return;
          }
        })
        .catch((error) => console.log(error));

      return () => {
        setUserProfile();
        setOrders();
      };
    }, [context.stateUser.isAuthenticated])
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>
          {userProfile ? userProfile.name : ""}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            Phone: {userProfile ? userProfile.phone : ""}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <Button
            title={"Sign Out"}
            onPress={() => [
              logoutUser(context.dispatch),
              AsyncStorage.removeItem("jwt"),
            ]}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60,
  },
});

export default UserProfile;
