import FBApp from './firebase';
import {Log} from './utils';


export function storeRepresentatives(reps) {
  Log("Yeah, storying reps");
  return FBApp.database().ref('user/' + FBApp.auth().currentUser.uid + '/representatives').set(reps);
}
