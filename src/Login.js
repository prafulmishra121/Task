import React, { useState, useCallback } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Dimensions } from "react-native";
import { TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useNavigation } from "@react-navigation/native";
import { Colors } from "./services/Colors";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login_method = async () => {
    if (email == "") {
      Alert.alert("", "empty email", [{ text: "OK", onPress: () => {} }]);
    } else if (password == "") {
      Alert.alert("", "empty password", [{ text: "OK", onPress: () => {} }]);
    } else if (email == "Task@gmail.com" && password == "1234") {
      Alert.alert("", "Login successful", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Home");
          },
        },
      ]);
    } else if (email != "Task@gmail.com" && password != "1234") {
      Alert.alert("", "Login failed", [{ text: "OK", onPress: () => {} }]);
    } else {
      Alert.alert("", "Login failed", [{ text: "OK", onPress: () => {} }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.input}>
        <TextInput
          placeholder="Email"
          onChangeText={(txt) => setEmail(txt)}
          value={email}
          placeholderTextColor={"#cccccc"}
          maxLength={40}
          keyboardType="email-address"
          style={styles.input_txt}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="Password"
          onChangeText={(value2) => setPassword(value2)}
          placeholderTextColor={"#cccccc"}
          secureTextEntry={true}
          value={password}
          style={styles.input_txt}
        />
      </View>
      <TouchableOpacity
       onPress={login_method}
      style={styles.input_box}>
        <Text style={styles.in_txt}>
          Log In
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    
  },
  img: {
    height: hp("40%"),
    width: wp("100%"),
    resizeMode: "contain",
    alignSelf: "center",
  },
  input_txt: { fontSize: wp("5.13%"), color: "#cccccc" },
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
