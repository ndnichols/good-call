import React, { Component } from 'react';
import { View, Button, Linking, ListView, Text, Navigator, TouchableHighlight } from 'react-native';
import * as persistence from '../persistence';
import * as storage from '../storage';

import _ from 'lodash';
import {Log} from '../utils';


class WaitingRow extends Component {
  render() {
    return <View><Text>Wait...</Text></View>
  }
}

class CallCallToAction extends Component {
  componentDidMount() {
    storage.getActiveAction().then((action) => {
      if (!action) {
        return;
      }
      Log("CallToAction knows it should show a screen!");
      this.props.onActiveAction(action);
    });
  }

  render() {
    const url = 'https://www.google.com/search?client=safari&rls=en&ie=UTF-8&oe=UTF-8&q=' + this.props.target.phones[0];
    return (
      <TouchableHighlight onPress={() => {
        var action = {
          type: 'attempt',
          callToAction: this.props.callToAction
        };
        storage.setActiveAction(action);
        persistence.storeAction(action);
        Linking.openURL(url)}}>
        <View style={{height:200}}>
          <Text>Call {this.props.target.name}</Text>
          <Text>{this.props.callToAction.script}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

export default class ActLinks extends Component {
  constructor(props) {
    super(props);
    this._data = _.fill(Array(this.props.issue.ctaCount), {type: 'waiting'});
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1 !== r2;
      }
    });
    this.state = {
      dataSource: ds.cloneWithRows(this._data),
      representatives: {}
    };
    this.ctaKeys = _.keys(this.props.issue.callToAction);
  }

  componentWillMount() {
    // Need to load each CTA
    storage.getRepresentatives().then((reps) => {
      this.setState({representatives: reps});
    });
    for (let ctaKey of this.ctaKeys) {
      persistence.getCTA(ctaKey).then((snapshot) => {
        var dataIndex = this.ctaKeys.indexOf(ctaKey);
        const cta = snapshot.val();
        this._data = this._data.slice();
        this._data[dataIndex] = {
          type: 'cta',
          callToAction: cta
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this._data)
        });
      });
    }
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
            else if (rowData.type === 'cta' && rowData.callToAction.type === 'call') {
              return <CallCallToAction
                callToAction={rowData.callToAction}
                target={this.state.representatives[rowData.callToAction.target]}/>
            }
            else {
              return <Text>Weird!</Text>
            }
          }}
        />
      </View>
    )
  }
}
