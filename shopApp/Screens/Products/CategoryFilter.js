import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { Badge, List } from "react-native-paper";

const CategoryFilter = ({ categoryFilter, active, setActive, categories }) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      // style={{
      //   justifyContent: "start",
      //   alignItems: "center",
      //   marginVertical: 10,
      //   height: 50,
      //   width: "100%",
      // }}
    >
      <TouchableOpacity
        key={1}
        onPress={() => {
          categoryFilter("all"), setActive(-1);
        }}
      >
        <Badge
          style={[
            {
              margin: 5,
              paddingHorizontal: 10,
            },
            styles.center,
            active === -1 ? styles.active : styles.inactvie,
          ]}
        >
          <Text style={{ color: "white", fontSize: 20 }}>All</Text>
        </Badge>
      </TouchableOpacity>
      {categories.map((item) => (
        <TouchableOpacity
          key={item._id.$oid}
          onPress={() => {
            categoryFilter(item._id.$oid), setActive(categories.indexOf(item));
          }}
        >
          <Badge
            style={[
              {
                margin: 5,
                paddingHorizontal: 10,
              },
              styles.center,
              active === categories.indexOf(item)
                ? styles.active
                : styles.inactvie,
            ]}
          >
            <Text style={{ color: "white", fontSize: 20 }}>{item.name}</Text>
          </Badge>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "red",
  },
  inactvie: {
    backgroundColor: "blue",
  },
});

export default CategoryFilter;
