import firebase from "firebase/app";
import "firebase/firestore";

let db :firebase.firestore.Firestore;

export function initFirestore() {
    if (firebase.apps.length && !db) {
        db = firebase.firestore();
    }
};

export function getFirestoreDB() {
    if (!db) {
        initFirestore();
    }
    return db;
}

export function addCard() {

}
