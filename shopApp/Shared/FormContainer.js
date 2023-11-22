import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const FormContainer = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
  },
});

export default FormContainer;
