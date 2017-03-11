import React, { Component } from 'react';
import { View, Button, Text, Navigator, TouchableHighlight } from 'react-native';
import RealmTasks from '../realm-tasks';

export default class ActLinks extends Component {
  static get defaultProps() {
    return {
      title: 'Links to Actions'
    };
  }

  render() {
    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button title="Back super hard" onPress={this.props.backToIssueList} />
        </View>
        <Button title={buttonTitle} onPress={() => fuckThatGuy(this.props.title)} />
      </View>
    )
  }
}
