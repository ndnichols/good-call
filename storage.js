import {AsyncStorage} from 'react-native'
import {Log} from './utils';

export function setRepresentatives(reps) {
  return AsyncStorage.setItem('representatives', JSON.stringify(reps));
}

export function getRepresentatives(reps) {
  return AsyncStorage.getItem('representatives').then((reps) => JSON.parse(reps));
}

export function setActiveAction(activeAction) {
  return AsyncStorage.setItem('activeAction', JSON.stringify(activeAction));
}

export function getActiveAction(activeAction) {
  return AsyncStorage.getItem('activeAction').then((activeAction) => JSON.parse(activeAction));
}

export function clearActiveAction() {
  return AsyncStorage.removeItem('activeAction');
}
