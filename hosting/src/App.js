import React, { useState } from "react";
import { useConstructor } from './customs/hooks';
import { fire } from './firebase';
import firebase from 'firebase/app';
//import TopAppBar from "./components/TopAppBar";
import UserContext from './customs/UserContext';
//import DataGrid from "./components/DataGrid";
import DataContext from "./customs/DataContext";
import SignInSide from "./components/SignInSide";

function App() {
  const [ user, setUser ] = useState(undefined);
  const [ userData, setUserData ] = useState(undefined);

  useConstructor(() => {
    fire();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
				/*
        getUserData(user.uid)
        .then(doc => {
          setUserData(doc.data());
        });*/
      } else {
        setUser(undefined);
        setUserData(undefined);
      }
    });
  });
  
  return (
    <UserContext.Provider value={{
      user,
      userData,
    }}>
      <DataContext>
				<SignInSide/>
      </DataContext>
    </UserContext.Provider>
  );
}

export default App;
