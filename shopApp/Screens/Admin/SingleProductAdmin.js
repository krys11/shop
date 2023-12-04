import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Button,
  LogBox,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Text, List } from "react-native-paper";
import TrafficLight from "../../Shared/StyledComponents/TrafficLight";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const SingleProductAdmin = () => {
  const { params } = useRoute();
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState("");

  useEffect(() => {
    if (params.item.countInStock === 0) {
      setAvailability(<TrafficLight unavailable></TrafficLight>);
      setAvailabilityText("Unvainable");
    } else if (params.item.countInStock === 5) {
      setAvailability(<TrafficLight limited></TrafficLight>);
      setAvailabilityText("Limited Stock");
    } else {
      setAvailability(<TrafficLight available></TrafficLight>);
      setAvailabilityText("Available");
    }

    return () => {
      setAvailability(null);
      setAvailabilityText("");
    };
  }, []);

  return (
    <>
      <ScrollView style={{ marginBottom: 60, padding: 5 }}>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: params.item.image
                  ? params.item.image
                  : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
              }}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text variant="headlineMedium" style={styles.contentHeader}>
              {params.item.name}
            </Text>
            <Text variant="headlineMedium" style={styles.contentText}>
              {params.item.brand}
            </Text>
            <View style={{ marginHorizontal: 15 }}>
              <View style={styles.available}>
                <Text>
                  Availability: {availabilityText} {availability}
                </Text>
              </View>
              <Text style={{ textAlign: "justify" }}>
                {params.item.description}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.price}>$ {params.item.price}</Text>
        </View>
        <View style={styles.btnAdd}>
          <Button title="ADD" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    padding: 0,
    margin: 0,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  contentText: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  available: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 25,
    margin: 20,
    color: "red",
  },
  btnAdd: {
    margin: 20,
  },
});

export default SingleProductAdmin;
