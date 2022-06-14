import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import NSmanViewPage from "./NSmanViewPage";
("./NSmanViewPage");

function LoginPage() {
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
          color: "black",
          textDecorationColor: "black",
          padding: 20,
          borderWidth: 1,
        }}
        placeholder="Password              "
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Logout");
          // NSmanViewPage.navigationOptions = {
          //   headerTitle: "Kilometers",
          //   headerLeft: () => {
          //     return null;
          //   },
          // };
        }}
        style={styles.button}
      >
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

const Stack = createStackNavigator();

export default function NsStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="NsScreen" component={LoginPage} />
        {/* <Stack.Screen name="SupervisorScreen" component={SupervisorHistory} /> */}
        <Stack.Screen name="Logout" component={NSmanViewPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
