import React from "react";
import {
    Menu,
    Container,
    Header,
    Icon,
    Input,
    Button
} from "semantic-ui-react";
import { LoginButton } from "./LoginButton";

export function TopMenubar() {
    return (
        <Menu stackable>
            <Container fluid>
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
                        color: 'white',
                    }}
                    />
                    <Button basic icon='search'/>
                </Menu.Item>
                <Menu.Item position='right'>
                    <LoginButton/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}
