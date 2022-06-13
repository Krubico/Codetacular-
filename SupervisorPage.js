import * as React from "react";
import {
  Text,
  View,
  Button,
  ButtonPressed,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TextInput } from "react-native";
import { Card, Title } from "react-native-paper";
import { ProgressBar, Colors } from "react-native-paper";

function SupervisorAdd() {
  return (
    <View style={{ flex: 1, alignItems: "left", margin: 30 }}>
      <Text> Date:</Text>
      <TextInput
        style={{
          height: 30,
          width: 220,
          margin: 5,
          backgroundColor: "lightgray",
          padding: 10,
          borderWidth: 1,
        }}
      />
      <Text> Driver's NS ID: </Text>
      <TextInput
        style={{
          height: 30,
          width: 220,
          margin: 5,
          backgroundColor: "lightgray",
          padding: 10,
          borderWidth: 1,
        }}
        placeholder="Singpass ID"
      />

      <Text> Vehicle's NS ID: </Text>
      <TextInput
        style={{
          height: 30,
          width: 220,
          margin: 5,
          backgroundColor: "lightgray",
          padding: 10,
          borderWidth: 1,
        }}
        placeholder="Vehicle ID"
      />
      <Text> Enter Miles: </Text>
      <TextInput
        style={{
          height: 60,
          width: 270,
          margin: 5,
          backgroundColor: "lightgray",
          padding: 10,
          borderWidth: 1,
        }}
        placeholder="Miles text input"
      />

      <Text> Additional Comments: </Text>
      <TextInput
        style={{
          height: 70,
          width: 270,
          margin: 5,
          backgroundColor: "lightgray",
          padding: 10,
          borderWidth: 1,
        }}
        placeholder="Additional comments (150 words)"
      />

      {/* <Text> Signature: </Text>
      <TextInput
        style={{
          height: 60,
          width: 270,
          margin: 5,
          backgroundColor: "lightgray",
          padding: 10,
          borderWidth: 1,
        }}
      /> */}

      <TouchableOpacity onPress={ButtonPressed}>
        <Text
          style={{
            width: 100,
            height: 30,
            backgroundColor: "black",
            color: "white",
            margin: 5,
            textAlign: "center",
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function SupervisorHistory() {
  return (
    <View
      style={{ flex: 1, justifyContent: "top", alignItems: "left", margin: 30 }}
    >
      <Text style={{ fontSize: 35 }}>Logs:</Text>
      <Card
        style={{
          height: 200,
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "lightgray",
          alignContent: "center",
          marginTop: 10,
        }}
      >
        <Card.Content>
          <Title style={{ fontSize: 15, textAlign: "left" }}>
            Date and Time: 12/8/2022 4.45pm
          </Title>
          <Title style={{ fontSize: 15, textAlign: "left" }}>
            Vehicle ID: S102234R
          </Title>
          <Title style={{ fontSize: 15, textAlign: "left" }}>
            Driver's Name: John
          </Title>
          <Title style={{ fontSize: 15, textAlign: "left" }}>
            Kilometers: 2km
          </Title>
          <Title style={{ fontSize: 15, textAlign: "left" }}>
            Additional Comments: Nil
          </Title>
        </Card.Content>
      </Card>
      <Card
        style={{
          height: 200,
          flexDirection: "row",
          backgroundColor: "lightgray",

          marginTop: 10,
        }}
      >
        <Card.Content>
          <Title style={{ fontSize: 15, textAlign: "left" }}>
            Date and Time: 12/8/2022 4.45pm
          </Title>
          <Title style={{ fontSize: 15, textAlign: "left" }}>
            Vehicle ID: S102234R
          </Title>
          <Title style={{ fontSize: 15, textAlign: "left" }}>
            Driver's Name: John
          </Title>
          <Title style={{ fontSize: 15, textAlign: "left" }}>
            Kilometers: 2km
          </Title>
          <Title style={{ fontSize: 15, textAlign: "left" }}>
            Additional Comments: Nil
          </Title>
        </Card.Content>
      </Card>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="add" component={SupervisorAdd} />
        <Tab.Screen name="history" component={SupervisorHistory} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
