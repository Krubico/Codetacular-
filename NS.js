
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  buttonPressed,
} from "react-native";
import { TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

function NsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
          padding: 20,
          borderWidth: 1,
        }}
        placeholder="Password              "
      />
      <TouchableOpacity onPress={buttonPressed} style={styles.button}> 
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

function Ns2Screen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text>Ns 2nd screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function NsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NsScreen" component={NsScreen} />
      <Stack.Screen name="Ns2ndScreen" component={Ns2Screen} />
    </Stack.Navigator>
  );
}
