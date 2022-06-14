import * as React from "react";
import { useState } from 'react';
import { Root, Popup } from 'popup-ui'
import {
  Text,
  View,
  Button,
  ButtonPressed,
  TouchableOpacity,
  TextInput
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Card, Title, ProgressBar, Colors } from "react-native-paper";

const singpassID = "T01234567A";
const authStatus = "supervisor";

function SupervisorAdd() {
  const [date, setDate] = useState('');
  const [driverId, setDriverId] = useState('');
  const [supervisorId, setSupervisorId] = useState('');
  const [miles, setMiles] = useState('');
  const [comments, setComments] = useState('');

  async function ButtonPressed() {
    let statusNum = -100;
    try {
      const method = 'POST'
      const payload = {
        "supervisorName": supervisorId,
       
        "date": 10000000,
       
        "driverID": driverId,
       
        "miles": miles,
       
        "comments": comments
       };
      const response = await fetch('http://44.232.66.213:443/records', { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      statusNum = response.status;
    } catch (error) {
      console.error(error);
    }
    if (statusNum === 200) {
      //Success
      console.log("Success submission");
      Popup.show({
        type: 'Success',
        title: 'Success!',
        button: true,
        textBody: 'Successfully submitted record',
        buttonText: 'Ok',
        callback: () => {
          setDate("");
          setDriverId("");
          setVehicalId("");
          setMiles("");
          setComments("");
          Popup.hide()
        }
      })
    } else {
      console.log("Error in submission")
      Popup.show({
        type: 'Danger',
        title: 'Something went wrong',
        button: true,
        textBody: 'Opps, something went wrong when submitting your record. Please try again.',
        buttonText: 'Ok',
        callback: () => {
          Popup.hide()
        }
      })
    }
  }

  return (
    <Root>
      <View style={{ flex: 1, margin: 30 }}>
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
          onChangeText={newText => setDate(newText)}
          defaultValue={date}
        />
        <Text> Supervisor Name </Text>
        <TextInput
          style={{
            height: 30,
            width: 220,
            margin: 5,
            backgroundColor: "lightgray",
            padding: 10,
            borderWidth: 1,
          }}
          onChangeText={newText => setSupervisorId(newText)}
          defaultValue={supervisorId}
          placeholder="Vehicle ID"
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
          onChangeText={newText => setDriverId(newText)}
          defaultValue={driverId}
          placeholder="Singpass ID"
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
          onChangeText={newText => setMiles(newText)}
          defaultValue={miles}
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
          onChangeText={newText => setComments(newText)}
          defaultValue={comments}
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
    </Root>
  );
}

async function SupervisorHistory() {
  var jsonResponse = "";
  try {
    const data = {
      "singpassID": singpassID,
  
      "authStatus": authStatus,
    };
  
    const response = await fetch(`http://44.232.66.213:443/records?authStatus=${encodeURIComponent(data.authStatus)}&singpassID=${encodeURIComponent(data.singpassID)}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    })
    
    jsonResponse = await response.json();
  } catch (error) {
    console.error(error);
  }


  return (
    <View
      style={{ flex: 1, margin: 30 }}
    >
      <Text style={{ fontSize: 35 }}>Logs:</Text>  
      {
        jsonResponse.forEach(doc => {
          <RecordCard
            fullName={doc.fullName}
            date={doc.data}
            miles={doc.miles}
            comments={doc.comments}
          />
        })
      }
    </View>
  );
}

function RecordCard(props) {
  const date = () => {
    const unixTime = props.date + (3600000*8);
    const singaporeDate = new Date(unixTime);
    const stringDate = singaporeDate.toString;
    return stringDate;
}
  return (
      <Card
      style={{
        height: 155,
        flexDirection: "row",
        backgroundColor: "lightgray",

        marginTop: 10,
      }}
    >
      <Card.Content>

      <Title style={{ fontSize: 15, textAlign: "left" }}>
            Date and Time: {date()}
          </Title>
          <Title style={{ fontSize: 15, textAlign: "left" }}>
            Vehicle ID: S102234R
          </Title>
          <Title style={{ fontSize: 15, textAlign: "left" }}>
            Driver's Name: {props.supervisorName}
          </Title>
          <Title style={{ fontSize: 15, textAlign: "left" }}>
            Kilometers: {props.miles} km
          </Title>
          <Title style={{ fontSize: 15, textAlign: "left" }}>
            Additional Comments: {props.comments}
          </Title>
      </Card.Content>
    </Card>
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

