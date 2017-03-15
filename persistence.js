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

export function getCTA(ctaKey) {
  let ctaRef = FBApp.database().ref('callToAction/' + ctaKey);
  return ctaRef.once('value');
}

export function storeAction(action) {
  let actionRef = FBApp.database().ref('user/' + FBApp.auth().currentUser.uid + '/actions');
  var newActionRef = actionRef.push();
  return newActionRef.set(action);
}

// updates['/issue/' + newIssueRef.key] = issueData;
// callToActionData.map(function(ctaData) {
//   var newCTARef = ctaRef.push();
//   issueData.callToAction[newCTARef.key] = true;


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
