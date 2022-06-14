import * as React from "react";
import { StyleSheet, Text, View, ProgressBar, Colors } from "react-native";
import { Card, Title } from "react-native-paper";

class TrackMilesCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
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
                        Current Miles {"\n"} {this.props.totalMiles}
                    </Title>

                    <Title style={{ fontSize: 20, flex: 1, textAlign: "center" }}>
                        Total Miles {"\n"} (100 KM)
                    </Title>
                </Card.Content>
            </Card>
        );
    }
}

class RecordCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const date = () => {
            const unixTime = this.props.date + (3600000 * 8);
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
                        Supervisor: {this.props.supervisorName}
                    </Title>
                    <Title style={{ fontSize: 15, textAlign: "left" }}>
                        Miles: {this.props.miles}
                    </Title>
                    <Title style={{ fontSize: 15, textAlign: "left" }}>
                        Date {"&"} Time: {date()}

                    </Title>
                </Card.Content>
            </Card>

        );
    }

}
export default class Nsmen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoadingMiles: true,
            dataSourceMiles: null,
            isLoadingRecords: true,
            dataSourceRecords: null
        }

    }
    componentDidMount() {
        fetch(`http://44.232.66.213:443/records?authStatus=${encodeURIComponent(this.props.authStatus)}&singpassID=${encodeURIComponent(this.props.singpassID.toUpperCase())}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response => response.json()))
            .then((responsejson) => {
                this.setState({
                    isLoadingRecords: false,
                    dataSourceRecords: responsejson
                })
            })
            .catch((error) => {
                console.error(error);
            })

        return fetch(`http://44.232.66.213:443/totalMiles?driverID=${encodeURIComponent(this.props.singpassID.toUpperCase())}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response => response.json()))
            .then((responsejson) => {
                this.setState({
                    isLoadingMiles: false,
                    dataSourceMiles: responsejson
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 40 }}>Hello User,</Text>
                <TrackMilesCard
                    totalMiles={this.state.isLoadingMiles ? "Loading miles" : this.state.dataSourceMiles.totalMiles}
                />

  

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
                    supervisorName={this.state.isLoadingRecords ? "Loading..." : this.state.dataSourceRecords[0].supervisorName}
                    date={this.state.isLoadingRecords ? "Loading..." : parseInt(this.state.dataSourceRecords[0].date)}
                    miles={this.state.isLoadingRecords ? "Loading..." : this.state.dataSourceRecords[0].miles}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
});