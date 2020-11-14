import firebase from "firebase/app";
import "firebase/firestore";
import { Card } from "./Card";

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

export function addCard(newCardTitle: string) {
    return db.collection('cards').doc().set({
        title: newCardTitle,
    })
}

export function removeCard(id: string) {
    return db.collection('cards').doc(id).delete();
}