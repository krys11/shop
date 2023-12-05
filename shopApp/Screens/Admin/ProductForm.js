import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Error from "../../Shared/Error";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

const { width } = Dimensions.get("window");

const ProductForm = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeature] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState(0);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setBrand(props.route.params.item.brand);
      setName(props.route.params.item.name);
      setPrice(props.route.params.item.price.toString());
      setDescription(props.route.params.item.description);
      setMainImage(props.route.params.item.image);
      setImage(props.route.params.item.image);
      setCategory(props.route.params.item.category._id);
      setCountInStock(props.route.params.item.countInStock.toString());
    }

    //token
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    //Categories
    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert("Error to load categories"));

    // Image Picker
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    return () => {
      setCategories([]);
    };
  }, []);

  const addProduct = async () => {
    if (
      name == "" ||
      brand == "" ||
      price == "" ||
      description == "" ||
      category == "" ||
      countInStock == ""
    ) {
      setError("Please fill in the form correctly");
    }

    let formData = new FormData();

    const newImageUri = "file:///" + image.split("file:/").join("");

    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });

    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("richDescription", richDescription);
    formData.append("rating", rating);
    formData.append("numReviews", numReviews);
    formData.append("isFeatured", isFeatured);

    // {
    //   image: {
    //     uri: newImageUri,
    //     type: mime.getType(newImageUri),
    //     name: newImageUri.split("/").pop(),
    //   },
    //   name: name,
    //   brand: brand,
    //   price: price,
    //   description: description,
    //   category: category,
    //   countInStock: countInStock,
    //   richDescription: richDescription,
    //   rating: rating,
    //   numReviews: numReviews,
    //   isFeatured: isFeatured,
    // };

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      image: {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop(),
      },
    };

    console.log(data);

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        image: {
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: newImageUri.split("/").pop(),
        },
        name: name,
        brand: brand,
        price: price,
        description: description,
        category: category,
        countInStock: countInStock,
        richDescription: richDescription,
        rating: rating,
        numReviews: numReviews,
        isFeatured: isFeatured,
      }),
    };

    if (item !== null) {
      // axios
      //   .put(`${baseURL}products/${item.id}`, formData, config)
      //   .then((res) => {
      //     if (res.status == 200 || res.status == 201) {
      //       Toast.show({
      //         topOffset: 60,
      //         type: "success",
      //         text1: "Product successfuly updated",
      //         text2: "",
      //       });
      //       setTimeout(() => {
      //         props.navigation.navigate("Products");
      //       }, 500);
      //     }
      //   })
      //   .catch((error) => {
      //     Toast.show({
      //       topOffset: 60,
      //       type: "error",
      //       text1: "Something went wrong",
      //       text2: "Please try againn",
      //     });
      //   });
      try {
        const f = await fetch(`${baseURL}products/${item.id}`, requestOptions);
        if (f.ok) {
          const data = await f.json();
        }
      } catch (error) {
        console.log("ProductForm: ", error);
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try againn",
        });
      }
    } else {
      axios
        .post(`${baseURL}products`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "New Product added",
              text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("Products");
            }, 500);
          }
        })
        .catch((error) => {
          console.log("ProductForm: ", error);
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        });
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMainImage(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  return (
    <FormContainer title="Add Product">
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: mainImage }} />
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <FontAwesome5Icon name="camera" color={"white"} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>Brand</Text>
        </View>
        <Input
          placeholder="Brand"
          name="brand"
          id="brand"
          value={brand}
          onChangeText={(text) => setBrand(text)}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>Name</Text>
        </View>
        <Input
          placeholder="Name"
          name="name"
          id="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>Price</Text>
        </View>
        <Input
          placeholder="Price"
          name="price"
          id="price"
          value={price}
          keyboardType={"numeric"}
          onChangeText={(text) => setPrice(text)}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>
            Count in Stock
          </Text>
        </View>
        <Input
          placeholder="Stock"
          name="stock"
          id="stock"
          value={countInStock}
          keyboardType={"numeric"}
          onChangeText={(text) => setCountInStock(text)}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>Description</Text>
        </View>
        <Input
          placeholder="Description"
          name="description"
          id="description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Select Category
          </Text>
        </View>
        <Picker
          selectedValue={pickerValue}
          onValueChange={(e, itemIndex) => [setPickerValue(e), setCategory(e)]}
          style={{ width: width - 80, marginHorizontal: 30 }}
          mode="dropdown"
          placeholder="Select Your Category"
        >
          {categories.map((c) => {
            return <Picker.Item key={c._id} label={c.name} value={c._id} />;
          })}
        </Picker>
        {err ? <Error message={err} /> : null}
        <View style={styles.buttonContainer}>
          <EasyButton large primary onPress={() => addProduct()}>
            <Text style={styles.buttonText}>Confirm</Text>
          </EasyButton>
        </View>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    width: "80%",
    marginTop: 10,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 80,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#E0E0E0",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});

export default ProductForm;
