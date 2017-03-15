import {AsyncStorage} from 'react-native'
import {Log} from './utils';

export function setRepresentatives(reps) {
  return AsyncStorage.setItem('representatives', JSON.stringify(reps));
}

export function getRepresentatives(reps) {
  return AsyncStorage.getItem('representatives').then((reps) => JSON.parse(reps));
}
