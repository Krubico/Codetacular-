import * as React from "react";
import { Card, Title } from "react-native-paper";
import PropTypes from 'prop-types';

export default class RecordCard extends React.Component { 
    constructor(props) {
      super(props);
    }
    render() { 
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
    date() {
        const unixTime = props.date + (3600000*8);
        const singaporeDate = new Date(unixTime);
        const stringDate = singaporeDate.toString;
        return stringDate;
    }
  }
  
  CustomText.propTypes = { supervisorName: PropTypes.string.isRequired, miles: PropTypes.string.isRequired, date: PropTypes.string.isRequired, };