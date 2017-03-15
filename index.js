import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ActiveAction from './components/ActiveAction'
import CallToAction from './components/CallToAction'
import FindYourReps from './components/FindYourReps';
import SignIn from './components/SignIn';
import IssueList from './components/IssueList';
import {Styles} from './styles';
import {Log} from './utils';
import * as persistence from './persistence';
import * as storage from './storage';

export default class GoodCall extends Component {
  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
  }

  render() {
    return (
      <Navigator
        initialRoute={{ key: 'signin' }}
        renderScene={(route, navigator) => {
          Log("renderScene Route is ", route);
          storage.getActiveAction().then((action) => {
            if (action) {
              Log("There was an active action at the top of renderScene!");
            }
          })
          if (route.key === 'signin') {
            return (<SignIn
              onSignedIn={() => {
                persistence.getRepresentatives().then((snapshot) => {
                  var reps = snapshot.val();
                  if (reps) {
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
                  storage.setRepresentatives(reps);
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
              onActiveAction={(action) => {
                navigator.push({key: 'activeAction', action:action})
              }}
            />
          }
          else if (route.key === 'callToAction') {
            return <CallToAction
              onBack={navigator.pop}
              issue={route.issue}
              onActiveAction={(action) => {
                navigator.push({key: 'activeAction', action:action})
              }}
            />
          }
          else if (route.key === 'activeAction') {
            return <ActiveAction
              onSuccess={() => {
                storage.clearActiveAction();
                navigator.pop();
              }}
            />
          }
        }}
        configureScene={(route) => {
          if (route.key === 'activeAction') {
            return Navigator.SceneConfigs.FloatFromBottom;
          }
          return Navigator.SceneConfigs.PushFromRight;
        }}
      />
    );
  }
}



AppRegistry.registerComponent('GoodCall', () => GoodCall);
