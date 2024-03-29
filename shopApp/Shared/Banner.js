import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useState(() => {
    setBannerData([
      "https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg",
      "https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg",
      "https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg",
    ]);

    return () => {
      setBannerData([]);
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
        <Swiper
          style={{ height: width / 2 }}
          loop={true}
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={2}
        >
          {bannerData.map((item) => {
            return (
              <Image
                source={{ uri: item }}
                key={item}
                resizeMode="contain"
                style={styles.imageBanner}
              />
            );
          })}
        </Swiper>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
    marginVertical: 0,
    paddingVertical: 20,
  },
  swiper: {
    width: width,
    alignItems: "center",
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});

export default Banner;
