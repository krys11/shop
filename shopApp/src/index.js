import "react-native-gesture-handler";

import { SafeAreaView, StyleSheet } from "react-native";
import ProductContainer from "../Screens/Products/ProductContainer";
import Header from "../Shared/Header";
import { NavigationContainer } from "@react-navigation/native";

//Navigation
import Main from "../Navigators/Main";

export default function Start() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Header />
        <Main />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
