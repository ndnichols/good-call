import React, { Component } from 'react';
import { View, Button, ListView, Text, Navigator, TouchableHighlight } from 'react-native';

import _ from 'lodash';

class WaitingRow extends Component {
  render() {
    return <View><Text>Wait...</Text></View>
  }
}

export default class ActLinks extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(_.fill(Array(this.props.issue.ctaCount), {type: 'waiting'}))
    };
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            if (rowData.type === 'waiting') {
              return <WaitingRow />
            }
            else {
              return <Text>Bad</Text>
            }
          }}
        />
      </View>
    )
  }
}
