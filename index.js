import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import FindYourReps from './components/FindYourReps';
import SignIn from './components/SignIn';
import IssueList from './components/IssueList';
import {Styles} from './styles';
import {Log} from './utils';
import * as persistence from './persistence';

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
              onSignedIn={() => {
                persistence.getRepresentatives().then((snapshot) => {
                  if (snapshot.val()) {
                    navigator.push({key:'ready'});
                  }
                  else {
                    navigator.push({key: 'findReps'})
                  }
                });
              }}
            />);
          }
          else if (route.key === 'findReps') {
            return <FindYourReps
              storeRepresentatives={(reps) => {
                persistence.storeRepresentatives(reps).then(() => {
                  Log("Ok stored representatives ok!");
                  navigator.push({key: 'ready'});
                });
              }}
            />
          }
          else if (route.key === 'ready') {
            return <IssueList
              onSelection={(issue) => {
                navigator.push({key: 'callToAction', issue:issue})
              }}
            />
          }
          else if (route.key === 'callToAction') {
            return <Text>Call To action regarding {route.issue.title}</Text>
          }
        }
      }/>
    );
  }
}



AppRegistry.registerComponent('GoodCall', () => GoodCall);
