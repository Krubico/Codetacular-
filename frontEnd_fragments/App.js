import React, { useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { FontAwesome } from "@expo/vector-icons";
import { useState } from 'react';
import { Root, Popup } from 'popup-ui'
import Supervisor from "./Supervisor";
import Nsmen from "./nsmen";

export default function App() {
    //react States
    const [visible, setVisible] = React.useState(false);
    const [page, setPage] = useState('login');
    const [singpassID, setSingpassID] = useState('');
    const [authStatus, setAuthStatus] = useState('');
    const [password, setPassword] = useState('');


    // fucntions
    const toggleSnackBar = () => setVisible(true);
    const onDismissSnackBar = () => setVisible(false);

    async function buttonPressed() {
        const method = 'POST'
        const payload = {
            "singpassID": singpassID.toUpperCase(), //convert to upper as we are storing it as such
            "password": password,
        };
        return fetch('http://44.232.66.213:443/authenticate', { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson["authStatus"] === undefined) {
                    //Wierd result, soemthing went wrong
                    console.warn("Response json is undefined");

                    //TODO
                } else if (responseJson["authStatus"] === "supervisor") {
                    console.log("Entering supervisor's page")
                    setAuthStatus("supervisor")
                    setPage("supervisor");
                } else if (responseJson["authStatus"] === "nsmen") {
                    console.log("Entering nsmen's page")
                    setAuthStatus("nsmen")
                    setPage("nsmen")
                } else if (responseJson["authStatus"] === "failed") {
                    console.log("Invalid id or password", singpassID, password);//debug
                    //Clear both fields upon failure
                    setSingpassID("");
                    setPassword("");
                    toggleSnackBar();
                }
                else {
                    console.warn("Unexpected resposne json from auth", responseJson);
                }
            })
            .catch((error) => {
                console.error(error);
                Popup.show({
                    type: 'Danger',
                    title: 'Something went wrong',
                    button: true,
                    textBody: 'Opps, something went wrong when trying to login. Please try again.',
                    buttonText: 'Ok',
                    callback: () => {
                        Popup.hide()
                    }
                })
            })
    }
    if (page === "login") {
        return (
            <View style={{ flex: 1, padding: 20, paddingTop: 120, alignItems: "center" }}>
                <FontAwesome name="user-circle-o" size={100} color="black" />
                <Text style={{ fontSize: 40 }}>Login</Text>

                <TextInput
                    style={{
                        width: "80%",
                        marginVertical: 10
                    }}
                    label="Singpass ID"
                    value={singpassID}
                    onChangeText={text => setSingpassID(text)}
                />
                <TextInput
                    style={{
                        width: "80%",
                        marginVertical: 10
                    }}
                    label="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <Button style={{ width: "60%", marginTop: 20, zIndex: 999 }} mode="contained" onPress={buttonPressed}>
                    Submit
                </Button>

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

                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'OK',
                        onPress: () => {
                            onDismissSnackBar();
                        },
                    }}>
                    Wrong singpassID or password {'\n'}
                    Please contact the administrator if you think this is a mistake
                </Snackbar>
            </View>
        );

    }else if (page === "supervisor") {
        return Supervisor(singpassID,authStatus);

    }else if (page === "nsmen") {
        return (
            <Nsmen singpassID = {singpassID} authStatus = {authStatus}/>
        )
    }
}

const styles = StyleSheet.create({
});