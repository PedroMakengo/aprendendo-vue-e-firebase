import firebase from "firebase/app";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyB3lNx9bL3blOboz3uPR8ShyCfNTezJt30",
  authDomain: "vueapp-fd6a9.firebaseapp.com",
  projectId: "vueapp-fd6a9",
  storageBucket: "vueapp-fd6a9.appspot.com",
  messagingSenderId: "635409671622",
  appId: "1:635409671622:web:b7f9f80f5458ade75d7ec7",
  measurementId: "G-6QY6CM38TW",
};

// Initialize firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
