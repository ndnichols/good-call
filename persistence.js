import FBApp from './firebase';
import {Log} from './utils';
import _ from 'lodash';

export function storeRepresentatives(reps) {
  return FBApp.database().ref('user/' + FBApp.auth().currentUser.uid + '/representatives').set(reps);
}

export function getRepresentatives() {
  let repRef = FBApp.database().ref('user/' + FBApp.auth().currentUser.uid + '/representatives');
  return repRef.once('value');
}

export function watchIssueList(f) {
  let issueRef = FBApp.database().ref('issue/');
  issueRef.on('value', (snapshot) => {
    var issues = [];
    snapshot.forEach((childSnapshot) => {
      var val = childSnapshot.val();
      val.ctaCount = _.size(val.callToAction);
      issues.push(val);
    });
    f(issues);
  });
}
