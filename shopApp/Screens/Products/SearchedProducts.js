import { View, Dimensions, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { List, Avatar, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const SearchedProducts = ({ productsFiltered }) => {
  const navigation = useNavigation();
  return (
    <View style={{ marginHorizontal: 30 }}>
      {productsFiltered.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={productsFiltered}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Product Detail", { item: item })
              }
            >
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
            </TouchableOpacity>
          )}
        />
      ) : (
        <View
          style={{
            alignItems: "center",
            paddingVertical: 25,
          }}
        >
          <Text style={{ fontSize: 20 }}>No Products</Text>
        </View>
      )}
    </View>
  );
};

export default SearchedProducts;
