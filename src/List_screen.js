import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "./services/Colors";
import { useNavigation } from "@react-navigation/native";
import { Images } from "./services/images";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const List_Screen = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const fetchData = async () => {
    console.log(page);
    try {
      fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      )
        .then((response) => response.json())
        .then(async (responseJson) => {
          if (selectAll == true) {
            const updatedData = responseJson.map((item) => ({
              ...item,
              isChecked: true,
            }));

            setProducts((prevData) => [...prevData, ...updatedData]);
          } else {
            const updatedData = responseJson.map((item) => ({
              ...item,
              isChecked: false,
            }));

            setProducts((prevData) => [...prevData, ...updatedData]);
          }
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    let temp = products.map((i) => {
      return { ...i, isChecked: false };
    });

    setProducts(temp);
    setRefreshing(false);
  };

  const handleChange = (id) => {
    let temp = products.map((i) => {
      if (id === i.id) {
        return { ...i, isChecked: !i.isChecked };
      }
      return i;
    });
    let selected = temp.filter((i) => i.isChecked);
    setCartItems(selected);
    setProducts(temp);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {loading ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Cart", { data: cartItems });
              }}
            >
              <Image style={styles.icon} source={{ uri: Images.cart }}></Image>
            </TouchableOpacity>
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={["#3498db"]}
                  tintColor={"#3498db"}
                />
              }
              renderItem={({ item, index }) => (
                <View style={styles.box}>
                  <Text style={styles.id_txt}>{index + 1}.</Text>
                  <Text
                    onPress={() => {
                      navigation.navigate("Product detail", {
                        name: item.title,
                        des: item.body,
                      });
                    }}
                    style={styles.title_txt}
                  >
                    {item.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      handleChange(item.id);
                    }}
                    style={styles.cart_btn}
                  >
                    <Text style={styles.cart_txt}>
                      {item.isChecked ? "added" : "add"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <Button title="Refresh" onPress={handleLoadMore} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default List_Screen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    // justifyContent: "center",
  },
  icon: {
    height: height * 0.08,
    width: width * 0.15,
    resizeMode: "contain",
    alignSelf: "flex-end",
    marginTop: "-10%",
  },
  cart_txt: {
    fontSize: wp("3.5%"),
    color: "white",
  },

  cart_btn: {
    height: height * 0.04,
    width: width * 0.2,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    flexDirection: "row",
    padding: "3%",
    justifyContent: "space-evenly",
  },
  img: {
    height: hp("40%"),
    width: wp("100%"),
    resizeMode: "contain",
    alignSelf: "center",
  },
  title_txt: { fontSize: wp("4%"), color: "black", width: width * 0.65 },
  id_txt: {
    fontSize: wp("4%"),
    color: "black",
    fontWeight: "bold",
    marginEnd: "2%",
  },
  bottom_txt: {
    flexDirection: "row",
    alignItems: "center",
    marginStart: "5%",
    paddingTop: "5%",
  },
  input: {
    height: height * 0.065,
    width: "90%",
    borderColor: "#cccccc",
    borderWidth: 1,
    alignSelf: "center",
    marginVertical: "3%",
    borderRadius: 3,
    justifyContent: "center",
    padding: "2%",
  },
  input_box: {
    height: height * 0.065,
    width: "90%",
    backgroundColor: Colors.MAIN_COLOR,

    alignSelf: "center",
    marginVertical: "3%",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  in_txt: {
    fontSize: wp("5.13%"),
    color: "white",
  },
  in_txt1: {
    fontSize: wp("4%"),
    color: "#0d274a",
  },
  in_txt2: {
    fontSize: wp("4%"),
    color: Colors.MAIN_COLOR,
    marginStart: "3%",
  },
});
