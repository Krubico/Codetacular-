import * as React from 'react';
import {
  Text,
  View,
  Button,
  ButtonPressed,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TextInput } from 'react-native';

function SupervisorAdd() {
  return (
    <View style={{ flex: 1, justifyContent: 'up', alignItems: 'left' }}>
      <Text> Date:</Text>
      <TextInput
        style={{
          height: 30,
          width: 220,
          margin: 5,
          backgroundColor: 'lightgray',
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
          backgroundColor: 'lightgray',
          padding: 10,
          borderWidth: 1,
        }}
        placeholder="Singpass ID"
      />

      <Text> Vehicle's NS ID: </Text>
      <TextInput
        style={{
          height: 30,
          width: 270,
          margin: 5,
          backgroundColor: 'lightgray',
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
          backgroundColor: 'lightgray',
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
          backgroundColor: 'lightgray',
          padding: 10,
          borderWidth: 1,
        }}
        placeholder="Additional comments (150 words)"
      />

      <Text> Signature: </Text>
      <TextInput
        style={{
          height: 60,
          width: 270,
          margin: 5,
          backgroundColor: 'lightgray',
          padding: 10,
          borderWidth: 1,
        }}
      />

      <TouchableOpacity onPress={ButtonPressed}>
        <Text
          style={{
            width: 50,
            height: 30,
            backgroundColor: 'black',
            color: 'white',
            margin: 10,
            alignItems: "center",
          }}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function SupervisorHistory() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Text>Settings!</Text>
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
