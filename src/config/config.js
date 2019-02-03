import * as firebase from 'firebase';

let config = {};

// Staging
config = {
  apiKey: 'AIzaSyDPZcfQFsk_Zztkbz5jNGMu-n8JStkOuaQ',
  authDomain: 'e-hub-b41d3.firebaseapp.com',
  databaseURL: 'https://e-hub-b41d3.firebaseio.com',
  projectId: 'e-hub-b41d3',
  storageBucket: 'e-hub-b41d3.appspot.com',
  messagingSenderId: '714269492493'
};

//  Production
// config = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
// };

firebase.initializeApp(config);
const firestore = firebase.firestore();
firestore.settings({
  timestampsInSnapshots: true
});
export default firebase;
