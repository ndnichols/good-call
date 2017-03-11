import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {Styles} from '../styles';
import FBApp from '../firebase';
import {Log} from '../utils';
import * as persistence from '../persistence';

class IssueRow extends Component {
  render() {
    return (
      <View style={{height: 200}}>
        <Text>{this.props.title}</Text>
        <Text>{this.props.text}</Text>
        <Text>{this.props.ctaCount}</Text>
      </View>
    );
  }
}

export default class IssueList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentDidMount() {
    persistence.watchIssueList((issues) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(issues)
      });
    });
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            return (<IssueRow
              title={rowData.title}
              text={rowData.text}
              ctaCount={rowData.ctaCount}
            />);
          }}
        />
      </View>
    );
  }
}

// App registration and rendering
AppRegistry.registerComponent('ListViewBasics', () => ListViewBasics);
