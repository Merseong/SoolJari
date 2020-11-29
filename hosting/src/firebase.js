import firebase from 'firebase/app';
import 'firebase/auth';

/// Firebase main app
let fbConfig = {
    apiKey: "AIzaSyCgOpj7xM54wHvP3F2NMsQLEj2626BnHlE",
    authDomain: "sooljari-alcdb.firebaseapp.com",
    databaseURL: "https://sooljari-alcdb.firebaseio.com",
    projectId: "sooljari-alcdb",
    storageBucket: "sooljari-alcdb.appspot.com",
    messagingSenderId: "536442650410",
    appId: "1:536442650410:web:52d3f028102e6e60b96853",
    measurementId: "G-KBRDDM5RSN"
};

export const fire = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(fbConfig);
    }
};

/// Firebase auth
export const googleLoginAction = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(res => {
        //console.log(res.user.uid);
    })
    .catch(err => {
        console.error(err);
    });
}

export const logoutAction = () => {
    firebase.auth().signOut()
    .then(() => {
        //console.log('logout');
    })
    .catch(err => {
        console.error(err);
    });
}
