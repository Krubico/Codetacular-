import * as React from "react";
// import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Title } from "react-native-paper";
import { ProgressBar, Colors } from "react-native-paper";

var student1 = {
  name: "John",
  currentKilo: "18km",
  toLicense: "20km",
  dateTime: "12/8/2022 4.45pm",
  recentRecord: "2km",
  Supervisor: "Andy",
};

export default function NSmanViewPage() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}>Hello</Text>
      <Card
        style={{
          height: 110,
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "lightgray",
          alignContent: "center",
        }}
      >
        <Card.Content
          style={{
            height: 110,
            flexDirection: "row",
            justifyContent: "left",
            backgroundColor: "lightgray",
            alignContent: "left",
          }}
        >
          <Title style={{ fontSize: 20, flex: 1, textAlign: "center" }}>
            Current Miles {"\n"} (10 Miles)
          </Title>

          <Title style={{ fontSize: 20, flex: 1, textAlign: "center" }}>
            To your license {"\n"} (10 Miles)
          </Title>
        </Card.Content>
      </Card>

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

          <Title style={{ fontSize: 15, textAlign: "left" }}>
            Date and Time: (Date and time)
          </Title>
          <Title style={{ fontSize: 15, textAlign: "left" }}>
            Miles: (Miles)
          </Title>
          <Title style={{ fontSize: 15, textAlign: "left" }}>
            Supervisor: (Supervisor name)
          </Title>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "left",
    justifyContent: "top",
    padding: 20,
  },
});