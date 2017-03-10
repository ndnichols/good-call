import FBApp from './firebase';
import {Log} from './utils';


export function storeRepresentatives(reps) {
  return FBApp.database().ref('user/' + FBApp.auth().currentUser.uid + '/representatives').set(reps);
}

export function getRepresentatives() {
  let repRef = FBApp.database().ref('user/' + FBApp.auth().currentUser.uid + '/representatives');
  return repRef.once('value');
}
