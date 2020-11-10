import React from 'react';
import firebase from "firebase/app";
import 'semantic-ui-css/semantic.min.css';
import { 
  Button,
  Container,
  Header, 
  Icon, 
  Input, 
  Menu,
} from 'semantic-ui-react';
import { LoginButton } from './component/LoginButton';

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

  return (
    <div>
      <Menu fixed='top' stackable>
        <Container>
          <Menu.Item>
            <Header>
              <Icon name='glass martini'/>
              <Header.Content>술자리</Header.Content>
            </Header>
          </Menu.Item>
          <Menu.Item>
            <Input
              transparent
              style={{
                minWidth: '320px',
              }}
            />
            <Button basic icon='search'/>
          </Menu.Item>
          <Menu.Item position='right'>
            <LoginButton/>
          </Menu.Item>
          <Menu.Item fitted></Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}

// :33 Menu로 변경예정, 로그인시 초록색 or 빨간색으로 되게?

export default App;
