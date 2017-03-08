/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import FindYourReps from './components/FindYourReps'
import SignIn from './components/SignIn'
import {Styles} from './styles'
import {Log} from './utils'

export default class GoodCall extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ key: 'signin' }}
        renderScene={(route, navigator) => {
          Log("Route is ", route);
          if (route.key === 'signin') {
            return <SignIn />
          }
          else {
            <View style={Styles.container}>
              <Text>{route.title}</Text>
            </View>
          }
        }
      }/>
    );
  }
}



AppRegistry.registerComponent('GoodCall', () => GoodCall);
