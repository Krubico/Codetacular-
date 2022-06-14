import * as React from "react";
import { Card, Title } from "react-native-paper";


export default function TrackMilesCard() {
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
// export default class TrackMilesCard extends React.Component { 
//   constructor(props) {
//     super(props);
//   }
//   render() { 
//     return (
//         <Card>
//             <Card.Content
//           style={{
//             height: 110,
//             flexDirection: "row",
//             backgroundColor: "lightgray",
//           }}
//         >
//                 <Title style={{ fontSize: 20, flex: 1, textAlign: "center" }}>
//                     Current Miles {"\n"} {props.totalMiles}
//                 </Title>

//                 <Title style={{ fontSize: 20, flex: 1, textAlign: "center" }}>
//                     Current Miles {"\n"} (100 KM)
//                 </Title>
//             </Card.Content>
//         </Card>
//     );
//   }
// }

// CustomText.propTypes = { totalMiles: PropTypes.string.isRequired };