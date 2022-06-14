import * as React from "react";
import { StyleSheet, Text, View, ProgressBar, Colors } from "react-native";
import { Card, Title } from "react-native-paper";
import {TrackMilesCard} from './components/TrackMilesCard'; 
import {RecordCard} from "./components/RecordCard";

const singpassID = "T01234567B"
const authStatus = "nsmen"

export default async function App() {
  var supervisorName = [];
  var driverID = [];
  var miles = [];
  var comments= [];
  var date = [];
  try {
      const res = await fetch('https://44.232.66.213:443/totalMiles', {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          driverID: 'T01234567B',
          })
        });
      const json = await response.json();
      var totalMiles = json.totalMiles;
  } catch (error) {
      console.error(error);
  }
  try {
      const res = await fetch('https://44.232.66.213:443/getRecords', {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          singpassID: singpassID,
          authStatus: authStatus
          })
        });
      
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