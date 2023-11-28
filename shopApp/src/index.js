import "react-native-gesture-handler";
import Toast from "react-native-toast-message";

import { SafeAreaView, StyleSheet } from "react-native";
import ProductContainer from "../Screens/Products/ProductContainer";
import Header from "../Shared/Header";
import { NavigationContainer } from "@react-navigation/native";

//Context Api
import Auth from "../Context/store/Auth";

//Navigation
import Main from "../Navigators/Main";

//Redux
import { Provider } from "react-redux";
import { store } from "../Redux/store";

export default function Start() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <Header />
            <Main />
          </SafeAreaView>
          <Toast />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
