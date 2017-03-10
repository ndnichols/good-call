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

var times = 0;

export default class GoodCall extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ key: 'signin' }}
        renderScene={(route, navigator) => {
          times++;
          if (times > 5) {
            throw Error("Too many times in render!");
          }
          Log("renderScene Route is ", route);
          if (route.key === 'signin') {
            return (<SignIn
              onSignedIn={() => navigator.push({key: 'findReps'})}
            />);
          }
          else if (route.key === 'findReps') {
            return <FindYourReps
              storeRepresentatives={(reps) => {
                Log(reps)
                navigator.push({key: 'ready'})
              }}
            />
          }
          else if (route.key === 'ready') {
            return (<View style={Styles.container}>
              <Text>You are ready to go!</Text>
            </View>);
          }
        }
      }/>
    );
  }
}



AppRegistry.registerComponent('GoodCall', () => GoodCall);
