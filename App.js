import { StatusBar } from "expo-status-bar";
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
// import * as React from "react";
// import { NavigationContainer, StackActions } from "@react-navigation/native";
// import NSmanViewPage from "./NSmanViewPage";

// const App = () => {
//   return (
//     <NavigationContainer>
//       <StackActions.Navigator>
//         <Stack.Screen name="login" component={NSmanViewPage} />
//       </StackActions.Navigator>
//     </NavigationContainer>
//   );
// };

export default function App() {
  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle-o" size={100} color="black" />
      <Text style={{ fontSize: 40 }}>Login</Text>
      <StatusBar style="auto" />
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
