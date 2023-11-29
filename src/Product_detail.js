import React, {  } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "./services/Colors";
import {  useRoute } from "@react-navigation/native";
const height = Dimensions.get("window").height;

const Product_detail = () => {
  const route = useRoute();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.box}>
          <Text style={styles.id_txt}>{route?.params.name}.</Text>
          <Text style={styles.title_txt}>{route?.params.des}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Product_detail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
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
  title_txt: { fontSize: wp("6%"), color: "black", marginTop: "20%" },
  id_txt: {
    fontSize: wp("8%"),
    color: "black",
    fontWeight: "bold",
    marginEnd: "2%",
    marginTop: "15%",
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
