import * as firebase from "firebase";

// Firebase config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
  apiKey: "AIzaSyBFcFp1a_4_NbKszbAOHGhjvZPsd3NeCQA",
  authDomain: "prosport-f09m03.firebaseapp.com",
  projectId: "prosport-f09m03",
  storageBucket: "prosport-f09m03.appspot.com",
  messagingSenderId: "552508159031",
  appId: "1:552508159031:web:98c8e42b7b7f1c85a27bb2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// exports
export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
