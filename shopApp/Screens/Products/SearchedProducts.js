import { View, Dimensions, FlatList } from "react-native";
import React from "react";
import { List, Avatar, Text } from "react-native-paper";

const { width } = Dimensions.get("window");

const SearchedProducts = ({ productsFiltered }) => {
  return (
    <View style={{ width: width, marginHorizontal: 20 }}>
      {productsFiltered.length > 0 ? (
        <FlatList
          data={productsFiltered}
          renderItem={({ item }) => (
            <List.Item
              title={<Text style={{ fontWeight: "bold" }}>{item.name}</Text>}
              description={item.description}
              left={() => (
                <Avatar.Image
                  size={60}
                  source={{
                    uri: item.image
                      ? item.image
                      : "https://www.freepngimg.com/thumb/fifa/11-2-fifa-png-images.png",
                  }}
                />
              )}
            />
          )}
        />
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ alignSelf: "center" }}>No Products</Text>
        </View>
      )}
    </View>
  );
};

export default SearchedProducts;
