import { SafeAreaView, StyleSheet } from "react-native";
import ProductContainer from "../Screens/Products/ProductContainer";
import Header from "../Shared/Header";

export default function Start() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ProductContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
