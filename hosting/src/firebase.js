import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
    db = firebase.firestore();
};

/// Firebase firestore
let db = undefined; // init on line 21

const checkDbInitialized = () => new Promise((res, rej) => {
    if (db) {
        res();
    } else {
        fire();
        db = firebase.firestore();
        res()
        //rej(new Error('Firestore DB not initalized'));
    }
})

export const getAllCards = () => new Promise((res, rej) => {
    checkDbInitialized()
    .then(() => {
        return db.collection('cards').get()
    })
    .then(querySnapshot => {
        res(querySnapshot.docs.map(doc => doc.data()));
    })
    .catch(err => {
        rej(err);
    })
})

export const getUserData = (uid) => db.collection('users').doc(uid).get()

export const getStaredCards = () => new Promise((res, rej) => {
    
})

/// Firebase auth
export const googleLoginAction = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    let userRef;

    firebase.auth().signInWithPopup(provider)
    .then(res => {
        //console.log(res.user.uid);
        // check firestore has userData
        userRef = db.collection('users').doc(res.user.uid);
        return userRef.get()
    })
    .then(doc => {
        if (!doc.exists) {
            return userRef.set({});
        } else {
            // if userData exists
            return userRef.get();
        }
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
