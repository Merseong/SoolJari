import React, { useState } from "react";
import { useConstructor } from './customs/hooks';
import { fire } from './firebase';
import firebase from 'firebase/app';
import TopAppBar from "./components/TopAppBar";
import SuperContext from './customs/SuperContext';
import DataGrid from "./components/DataGrid";
import DataContext from "./customs/DataContext";

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
  });
  
  return (
    <SuperContext.Provider value={{
      userData,
    }}>
      <DataContext>
        <TopAppBar/>
        <DataGrid/>
      </DataContext>
    </SuperContext.Provider>
  );
}

export default App;
