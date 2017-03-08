import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {Styles} from '../styles'

export default class SignIn extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.instructions}>Welcome to Good Call!</Text>
      </View>
    )
  }
}
