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
    phones: json.officials[senateIndices[0]].phones,
    position: 'senator1',
    title: 'Senator'
  }, {
    name: json.officials[senateIndices[1]].name,
    phones: json.officials[senateIndices[1]].phones,
    position: 'senator2',
    title: 'Senator'
  }, {
    name: json.officials[houseIndex].name,
    phones: json.officials[houseIndex].phones,
    position: 'representative',
    title: 'Representative'
  }];
  let reps = {};
  for (var rep of replist) {
    reps[rep.position] = {
      name: rep.name,
      title: rep.title,
      phones: rep.phones
    }
  }
  return reps;
}

export default class FindYourReps extends Component {
  render() {
    return (
      <View style={{height: 400}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{height: 150, width:300}}>
            <Text>
              Please enter your name and home address below. This information is NOT stored anywhere besides on your phone.
            </Text>
          </View>
          <View style={{height: 100, width: 300, borderRadius: 4, borderWidth: 0.5, borderColor: '#d6d7da'}}>
            <TextInput
              style={{flex: 1}}
              placeholder="Your name"
            />
            <TextInput
              style={{flex: 1}}
              placeholder="Your address"
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
        </View>
      </View>
    );
  }
}
