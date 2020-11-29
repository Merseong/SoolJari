import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import {
  googleLoginAction,
  logoutAction,
  fire,
} from './firebase';
import firebase from 'firebase/app';


function App() {
  fire();

  const [ userEmail, setUserEmail ] = useState(undefined);
  const [ userId, setUserId ] = useState(undefined);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setUserId(user.uid);
      setUserEmail(user.email);
    } else {
      setUserId(undefined);
      setUserEmail(undefined);
    }
  })
  
  return (
    <>
      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          if (userId) {
            logoutAction();
          } else {
            googleLoginAction();
          }
        }}
      >
        {userId ? 'Logout' : 'Login'}
      </Button>
      <p>{userEmail}</p>
      <p>{userId}</p>
    </>
  );
}

export default App;
