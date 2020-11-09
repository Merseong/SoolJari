import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { 
  Button,
  Container,
  Header, 
  Icon, 
  Input, 
  Menu,
} from 'semantic-ui-react';

function App() {
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
            <Icon fitted size='large' name='user' link/>{{/** 메뉴로 변경예정, 로그인시 초록색으로 되게 */}}
          </Menu.Item>
          <Menu.Item fitted></Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}

export default App;
