import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const Input = (props) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      name={props.name}
      id={props.id}
      value={props.value}
      autoCorrect={props.autoCorrect}
      onChangeText={props.onChangeText}
      onFocus={props.onFocus}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 60,
    margin: 10,
    borderRadius: 20,
    borderColor: "orange",
    borderWidth: 2,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
});

export default Input;
