import * as firebase from 'firebase';

// Staging
var config= {
    apiKey: "AIzaSyDPZcfQFsk_Zztkbz5jNGMu-n8JStkOuaQ",
    authDomain: "e-hub-b41d3.firebaseapp.com",
    databaseURL: "https://e-hub-b41d3.firebaseio.com",
    projectId: "e-hub-b41d3",
    storageBucket: "e-hub-b41d3.appspot.com",
    messagingSenderId: "714269492493"
}

firebase.initializeApp(config);
const firestore = firebase.firestore();
firestore.settings({
    timestampsInSnapshots: true
});
export default firebase;