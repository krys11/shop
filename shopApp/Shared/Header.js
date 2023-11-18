import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import React from "react";

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require("../assets/Logo.png")}
        resizeMode="contain"
        style={{ height: 50 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
});

export default Header;
