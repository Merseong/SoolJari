import React, { useState } from "react";
import { useConstructor } from './customs/hooks';
import { fire } from './firebase';
import firebase from 'firebase/app';
import TopAppBar from "./components/TopAppBar";
import SuperContext from './customs/SuperContext';
import { Typography } from "@material-ui/core";

function App() {
  const [ userData, setUserData ] = useState(undefined);

  useConstructor(() => {
    fire();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUserData(user);
      } else {
        setUserData(undefined);
      }
    });
  })
  
  return (
    <SuperContext.Provider value={{
      userData,
    }}>
      <TopAppBar/>
      <div style={{
        margin: '8px',
      }}>
        <Typography variant='h6'>{userData ? userData.email : ''}</Typography>
        <Typography variant='h6'>{userData ? userData.uid : ''}</Typography>
      </div>
    </SuperContext.Provider>
  );
}

export default App;
