import "react-native-gesture-handler";

import { SafeAreaView, StyleSheet } from "react-native";
import ProductContainer from "../Screens/Products/ProductContainer";
import Header from "../Shared/Header";
import { NavigationContainer } from "@react-navigation/native";

//Navigation
import Main from "../Navigators/Main";

//Redux
import { Provider } from "react-redux";
import { store } from "../Redux/store";

export default function Start() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Header />
          <Main />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
