import React from 'react';
import reactLogo from './React_logo.svg';
import firebaseLogo from './Firebase_Logo_Logomark.svg'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <img src={firebaseLogo} className="App-logo" alt="logo" />
          <img src={reactLogo} className="App-logo" alt="logo" />
        </p>
        <p>
          Firebase with React-Typescript!
        </p>
        <p>
          by SoolJari
        </p>
      </header>
    </div>
  );
}

export default App;
