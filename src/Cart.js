import React, { useState,  } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "./services/Colors";
import { useRoute } from "@react-navigation/native";
const height = Dimensions.get("window").height;


const Cart = () => {
  const route = useRoute();

  const [products, setProducts] = useState(route?.params?.data);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.box}>
              <Text style={styles.id_txt}>{index + 1}.</Text>
              <Text style={styles.title_txt}>{item.title}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    
  },
  box: {
    padding: "5%",
  },
  img: {
    height: hp("40%"),
    width: wp("100%"),
    resizeMode: "contain",
    alignSelf: "center",
  },
  title_txt: { fontSize: wp("6%"), color: "black", marginTop: "5%" },
  id_txt: {
    fontSize: wp("8%"),
    color: "black",
    fontWeight: "bold",
    marginEnd: "2%",
    marginTop: "5%",
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
