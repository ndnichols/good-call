import firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyD2LwLLQjBmhvUcOFAa7tMRVXWKFKXJtec",
  authDomain: "good-call-71580.firebaseapp.com",
  databaseURL: "https://good-call-71580.firebaseio.com",
  storageBucket: "good-call-71580.appspot.com",
  messagingSenderId: "722759748186"
};

export default firebase.initializeApp(firebaseConfig);
// export const FBApp = firebase.initializeApp(firebaseConfig);
