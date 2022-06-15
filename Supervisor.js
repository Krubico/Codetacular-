import * as React from "react";
import { useState } from 'react';
import { Root, Popup } from 'popup-ui'
import {
    Text,
    View,
    ButtonPressed,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { TextInput,Button } from 'react-native-paper';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Card, Title, ProgressBar, Colors } from "react-native-paper";
import { setStatusBarTranslucent } from "expo-status-bar";

function SupervisorAdd() {
    const [date, setDate] = useState('');
    const [driverId, setDriverId] = useState('');
    const [supervisorId, setSupervisorId] = useState('');
    const [miles, setMiles] = useState('');
    const [comments, setComments] = useState('');

    const dateConvert = (yaydate) => {
        const unixTime = yaydate + (3600000 * 8);
        const singaporeDate = new Date(unixTime);
        const stringDate = singaporeDate.toString;
        return stringDate;
    }
    async function ButtonPressed() {
        let statusNum = -100;
        try {
            const method = 'POST'
            const payload = {
                "supervisorName": supervisorId,

                "date": Date.now(),

                "driverID": driverId,

                "miles": parseInt(miles),

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
            <ScrollView>
                <View style={{ flex: 1, padding: 20, paddingTop: 15, alignItems: "center" }}>
                    <Text> Date:</Text>
                    <Text> {(new Date(Date.now()+3600000 * 8)).toString()} </Text>
                    <Text> Vehicle ID </Text>
                    <TextInput
                    style={{
                        width: "80%",
                        marginVertical: 10
                    }}
                        onChangeText={newText => setSupervisorId(newText)}
                        defaultValue={supervisorId}
                        placeholder="Vehicle ID:"
                    />

                    <Text> Driver's NS ID: </Text>
                    <TextInput
                    style={{
                        width: "80%",
                        marginVertical: 10
                    }}
                        onChangeText={id => setDriverId(id)}
                        defaultValue={driverId}
                        placeholder="Singpass ID"
                    />

                    <Text> Enter Miles: </Text>
                    <TextInput
                    style={{
                        width: "80%",
                        marginVertical: 10
                    }}
                        onChangeText={newText => setMiles(newText)}
                        defaultValue={miles}
                        placeholder="Miles text input"
                    />

                    <Text> Additional Comments: </Text>
                    <TextInput
                    style={{
                        width: "80%",
                        marginVertical: 10
                    }}
                        onChangeText={newText => setComments(newText)}
                        defaultValue={comments}
                        placeholder="Additional comments (150 words)"
                    />

                    <Text> Signature: </Text>
                    <TextInput
                    style={{
                        width: "80%",
                        marginVertical: 10
                    }}
                    />
                <Button style={{ width: "60%", marginTop: 20, zIndex: 999 }} mode="contained" onPress={ButtonPressed}>
                    Submit
                </Button>
                </View>
            </ScrollView>
        </Root>
    );
}

class SupervisorHistory extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            dataSource: null
        }

    }

    componentDidMount() {

        return fetch(`http://44.232.66.213:443/records?authStatus=${encodeURIComponent(this.props.route.params.authStatus)}&singpassID=${encodeURIComponent(this.props.route.params.singpassID)}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response => response.json()))
            .then((responsejson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responsejson
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }

    render() {
        return (
            <ScrollView style={{ flexGrow: 0 }}>
                <View style={{ flex: 1, margin: 30 }}>

                    <Text style={{ fontSize: 35 }}>Logs:</Text>
                    {
                        (!this.state.isLoading ?
                            this.state.dataSource.map((row) => {
                                return (<RecordCard
                                    fullName={row.fullName}
                                    date={row.date}
                                    miles={row.miles}
                                    comments={row.comments}
                                />)
                            }) : <Text>Loading data</Text>)
                    }

                </View>
            </ScrollView>
        );
    }
}


function RecordCard(props) {
    const date = () => {
        const unixTime = props.date + (3600000 * 8);
        const singaporeDate = new Date(unixTime);
        const stringDate = singaporeDate.toString;
        return stringDate;
    }
    var dateString = date();
    return (
        <Card
            style={{
                flexDirection: "row",
                backgroundColor: "lightgray",

                marginTop: 10,
            }}
        >
            <Card.Content>

                <Title style={{ fontSize: 15, textAlign: "left" }}>
                    Date and Time: {'15/6/2022'}
                </Title>
                <Title style={{ fontSize: 15, textAlign: "left" }}>
                    Vehicle ID: S102234R
                </Title>
                <Title style={{ fontSize: 15, textAlign: "left" }}>
                    Driver's Name: {props.fullName}
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

export default function Supervisor(singpassID, authStatus) {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Create record" component={SupervisorAdd} initialParams={{
                    "singpassID": singpassID,
                    "authStatus": authStatus
                }} />
                <Tab.Screen name="Record history" component={SupervisorHistory} initialParams={{
                    "singpassID": singpassID,
                    "authStatus": authStatus
                }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}