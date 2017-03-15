import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  ListView,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import {Styles} from '../styles';
import FBApp from '../firebase';
import {Log} from '../utils';
import * as persistence from '../persistence';
import * as storage from '../storage';

class IssueRow extends Component {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onPress(this.props.issue)}>
        <View style={{height: 200}}>
          <Text>{this.props.issue.title}</Text>
          <Text>{this.props.issue.text}</Text>
          <Text>{this.props.issue.ctaCount}</Text>
        </View>
      </TouchableHighlight>
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
    storage.getActiveAction().then((action) => {
      if (!action) {
        return;
      }
      this.props.onActiveAction(action);
    });
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
          renderRow={(rowData) => <IssueRow issue={rowData} onPress={this.props.onSelection} />}
        />
      </View>
    );
  }
}

// App registration and rendering
AppRegistry.registerComponent('ListViewBasics', () => ListViewBasics);
