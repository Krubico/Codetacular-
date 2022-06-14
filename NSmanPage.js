import * as React from "react";
import { StyleSheet, Text, View, ProgressBar, Colors } from "react-native";
import { Card, Title } from "react-native-paper";
// import {TrackMilesCard} from './components/TrackMilesCard'; 
// import {RecordCard} from "./components/RecordCard";

//Dynamic this
const singpassID = "T01234567B";

const authStatus = "nsmen";

function TrackMilesCard(props) {
  return (
    <Card>
        <Card.Content
      style={{
        height: 110,
        flexDirection: "row",
        backgroundColor: "lightgray",
      }}
    >
            <Title style={{ fontSize: 20, flex: 1, textAlign: "center" }}>
                Current Miles {"\n"} {props.totalMiles}
            </Title>

            <Title style={{ fontSize: 20, flex: 1, textAlign: "center" }}>
                Current Miles {"\n"} (100 KM)
            </Title>
        </Card.Content>
    </Card>
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
        Supervisor: {props.supervisorName}
      </Title>
      <Title style={{ fontSize: 15, textAlign: "left" }}>
        Miles: {props.miles}
      </Title>
      <Title style={{ fontSize: 15, textAlign: "left" }}>
        Date {"&"} Time: {this.date}
       
      </Title>
    </Card.Content>
  </Card>
  
  );

}

export default async function App() {

  var supervisorName = [];
  var miles = [];
  var date = [];


  try {
    const data = {
      driverID: 'T01234567B',
    };
  
    const response = await fetch(`http://44.232.66.213:443/records?driverID=${encodeURIComponent(data.driverID)}}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    })
    
    const json = await response.json();
    var totalMiles = json.totalMiles;
  } catch (error) {
    console.error(error);
  }

  try {
    const data = {
      "singpassID": singpassID,
  
      "authStatus": authStatus,
    };
  
    const response = await fetch(`http://44.232.66.213:443/records?authStatus=${encodeURIComponent(data.authStatus)}&singpassID=${encodeURIComponent(data.singpassID)}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    })
    
    const json = await response.json();
    json.forEach(doc => {
      supervisorName.push(doc.supervisorName);
      date.push(doc.date);
      miles.push(doc.miles);
    });
  } catch (error) {
    console.error(error);
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}>Hello</Text>
      <TrackMilesCard
        totalMiles={totalMiles}
      />

      <ProgressBar progress={0.5} color={Colors.black} style={{ height: 10 }} />
      <Card
        style={{
          height: 155,
          flexDirection: "row",
          backgroundColor: "lightgray",

          marginTop: 10,
        }}
      >
        <Card.Content>
        <Title style={{ fontSize: 20, textAlign: "left" }}>
            Most Recent Record: 
          </Title>
        </Card.Content>
      </Card>
      <RecordCard 
        supervisorName={supervisorName[0]}
        date={date[0]}
        miles={miles[0]}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
});