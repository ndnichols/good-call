import React, { Component } from 'react';
import { View, Button, Linking, ListView, Text, Navigator, TouchableHighlight } from 'react-native';
import * as persistence from '../persistence';
import * as storage from '../storage';

import _ from 'lodash';
import {Log} from '../utils';
import {Styles} from '../styles';

export default class ActiveAction extends Component {
  render() {
    Log("Rendering an activeaction!");
    return (<View style={Styles.container}>
      <Text style={Styles.instructions}>You did an action!</Text>
      <Button
        onPress={this.props.onSuccess}
        title="I was successful!"
      />
      <Button
        onPress={this.props.onSuccess}
        title="I wasn't able to get through, but I want to try again later!"
      />
      <Button
        onPress={this.props.onSuccess}
        title="I wasn't able to get through, and I give up!"
      />
    </View>)
    ;
  }
}
