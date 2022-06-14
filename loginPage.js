import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Navigator from "./navigation";

function LoginPage() {
  async function buttonPressed() {
    let statusNum = -100;
    try {
      const method = "POST";
      const payload = {
        singpassID: 12009933,
        password: testing123,
      };
      const response = await fetch("http://44.232.66.213:443/authenticate", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      results = await response.json();
    } catch (error) {
      console.error(error);
    }
    if (response.status === 200) {
      //Success
      console.log("Success submission");
      Popup.show({
        type: "Success",
        title: "Success!",
        button: true,
        textBody: "Successfully submitted record",
        buttonText: "Ok",
        callback: () => {
          Popup.hide();
        },
      });
    } else {
      console.log("Error in submission");
      Popup.show({
        type: "Danger",
        title: "Something went wrong",
        button: true,
        textBody:
          "Opps, something went wrong when trying to login. Please try again.",
        buttonText: "Ok",
        callback: () => {
          Popup.hide();
        },
      });
    }
  }
  return (
    <View style={styles.container}>
      <Navigator />
      <FontAwesome name="user-circle-o" size={100} color="black" />
      <Text style={{ fontSize: 40 }}>Login</Text>
      <TextInput
        style={{
          height: 40,
          width: 250,
          marginLeft: 10,
          marginTop: 20,
          backgroundColor: "lightgray",
          padding: 20,
          borderWidth: 1,
        }}
        placeholder="Enter Singpass ID"
      />
      <TextInput
        style={{
          height: 40,
          width: 250,
          marginLeft: 10,
          marginTop: 20,
          backgroundColor: "lightgray",
          color: "black",
          textDecorationColor: "black",
          padding: 20,
          borderWidth: 1,
        }}
        placeholder="Password              "
      />

      <TouchableOpacity onPress={pressedButton} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 12,
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        Visit the Singpass website if you have {"\n"} forgotten your Singpass ID
        and/or {"\n"} password
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "black",
    marginTop: 15,
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
  },
});

export default LoginPage;
