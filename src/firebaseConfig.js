import firebase from 'firebase';

// // firebase init - add your own config here
// const firebaseConfig = {
//   apiKey: '',
//   authDomain: '',
//   databaseURL: '',
//   projectId: '',
//   storageBucket: '',
//   messagingSenderId: '',
//   appId: ''
  
// }
// firebase.initializeApp(firebaseConfig)

var firebaseConfig = {
    apiKey: "AIzaSyB4nN60WZ5CSQXv8xa0xAOeeZwWLyd0UB4",
    authDomain: "quiz-ans-bf958.firebaseapp.com",
    projectId: "quiz-ans-bf958",
    storageBucket: "quiz-ans-bf958.appspot.com",
    messagingSenderId: "301848527562",
    appId: "1:301848527562:web:76ab78a728ad2e6c0e6a33"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore()
const auth = firebase.auth()

export {
  db,
  auth
}
