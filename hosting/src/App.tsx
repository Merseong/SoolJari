import React from 'react';
import firebase from "firebase/app";
import 'semantic-ui-css/semantic.min.css';
import {
  Container,
} from 'semantic-ui-react';
import { initFirestore } from './firestore/FirestoreActions';
import { CardGroup } from './component/CardGroup';
import { TopMenubar } from './component/TopMenubar';
import { LoginContextProvider } from './context/LoginContext';

function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyCgOpj7xM54wHvP3F2NMsQLEj2626BnHlE",
    authDomain: "sooljari-alcdb.firebaseapp.com",
    databaseURL: "https://sooljari-alcdb.firebaseio.com",
    projectId: "sooljari-alcdb",
    storageBucket: "sooljari-alcdb.appspot.com",
    messagingSenderId: "536442650410",
    appId: "1:536442650410:web:52d3f028102e6e60b96853",
    measurementId: "G-KBRDDM5RSN"
  }

  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  initFirestore();

  ///-------------------------------------------------------------

  return (
    <LoginContextProvider>
      <TopMenubar/>
      <Container fluid>
        <CardGroup cardItems={[]}/>
      </Container>
    </LoginContextProvider>
  );
}

export default App;
