import React, { Component } from 'react';
import { View, Label, Text, TextInput} from 'react-native';

function buildRepresentatives(json) {
  let senateIndices = json.offices.find(
    (office) => office.officialIndices.length > 1
  ).officialIndices;
  let houseIndex = json.offices.find(
    (office) => office.officialIndices.length === 1
  ).officialIndices[0];
  let replist = [{
    name: json.officials[senateIndices[0]].name,
    position: 'senator1',
    title: 'Senator'
  }, {
    name: json.officials[senateIndices[1]].name,
    position: 'senator2',
    title: 'Senator'
  }, {
    name: json.officials[houseIndex].name,
    position: 'representative',
    title: 'Representative'
  }];
  let reps = {};
  for (var rep of replist) {
    reps[rep.position] = {
      name: rep.name,
      title: rep.title
    }
  }
  return reps;
}

export default class FindYourReps extends Component {
  render() {
    return <View flex={1}>
      <Text flex={1}>Enter your address below</Text>
      <TextInput flex={1}
        placeholder="123 Maple St."
        returnKeyType="search"
        onSubmitEditing={(event) => {
          let address = event.nativeEvent.text;
          let url = "https://www.googleapis.com/civicinfo/v2/representatives?levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody&key=AIzaSyAIEAW7KLRqgKYeJTprDLlW8QqJA8-6ctE&address=" + encodeURI(address);
          fetch(url).then((res) => {
            if (res.ok) {
              res.json().then((json) => {
                let reps = buildRepresentatives(json);
                this.props.storeRepresentatives(reps);
              });
            }
            else {
              console.log("Error hitting Google Civic API");
            }
          });
        }}/>
    </View>
  }
}
