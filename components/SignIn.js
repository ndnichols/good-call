import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {Styles} from '../styles'
import FBApp from '../firebase'
import {Log} from '../utils'

export default class SignIn extends Component {
  componentWillMount() {
    Log("Starting listening for authState");
    FBApp.auth().onAuthStateChanged((user) => {
      Log("In authstatechanged!");
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        Log("The user signed in anonymously as uid ", uid);
        this.props.onSignedIn()
      } else {
        Log("The user was not signed in!")
        Log("Going to make a new user!");
        FBApp.auth().signInAnonymously().catch(function(error) {
          Log("There was an error signing in anonymously");
          Log(error);
        });
      }
    });
  }

  render() {
    return (<View style={Styles.container}>
      <Text style={Styles.instructions}>Welcome to Good Call!</Text>
    </View>);
  }
}
