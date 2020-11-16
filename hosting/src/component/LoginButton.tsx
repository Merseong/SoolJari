import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {
    Button,
    Dropdown,
    Icon
} from "semantic-ui-react";
import { AddCardModal } from "./AddCardModal";
import { RemoveCardModal } from "./RemoveCardModal";
import { LoginDispatch, LoginDispatchContext } from "../context/LoginContext";

interface LoginButtonProps {
}

interface LoginButtonState {
    isLogin: boolean,
    isAdmin: boolean,
}

export class LoginButton extends React.Component<LoginButtonProps, LoginButtonState> {
    constructor(props: LoginButtonProps) {
        super(props);
        this.state = {
            isLogin: false,
            isAdmin: false,
        }
    }

    googleLogin(loginDispatch: LoginDispatch) {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then(result => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            //const credential = result.credential as firebase.auth.OAuthCredential;
            //const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            //console.log(token, user);
            if (user) {
                this.setState({
                    isLogin: true,
                    isAdmin: user.email === 'esc990720@korea.ac.kr',
                });
                loginDispatch({
                    type: 'LOGIN',
                    isAdmin: user.email === 'esc990720@korea.ac.kr',
                    loginData: user,
                })
                console.log('Google Login');
            }
        })
        .catch(error => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            console.error(errorCode, errorMessage, email, credential);
        });
    }

    logout(loginDispatch: LoginDispatch) {
        if (this.state.isLogin) {
            firebase.auth().signOut()
            .then(() => {
                this.setState({
                    isLogin: false,
                    isAdmin: false,
                });
                loginDispatch({
                    type: 'LOGOUT'
                })
                console.log('Logout');
            })
            .catch(e => {
                console.error(e)
            });
        }
    }

    componentDidUpdate() {
        console.log(this.context);
    }

    render() {
        const { isLogin, isAdmin } = this.state;

        return (
            <LoginDispatchContext.Consumer>
                {
                    dispatch => (
                        isLogin ?
                        isAdmin ?
                            <Dropdown
                                icon={<Icon name='user' size='large' fitted color='green'/>}
                                floating
                                button
                                className='icon'
                                pointing='top right'
        
                            >
                                <Dropdown.Menu>
                                    <Dropdown.Item content={<AddCardModal/>}/>
                                    <Dropdown.Item content={<RemoveCardModal/>}/>
                                </Dropdown.Menu>
                            </Dropdown>
                            :
                            <Button
                                color='red'
                                icon={<Icon fitted size='large' name='user'/>}
                                onClick={() => this.logout(dispatch!)}
                            />
                        :
                        <Button
                            basic
                            icon={<Icon fitted size='large' name='user'/>}
                            onClick={() => this.googleLogin(dispatch!)}
                        />
                    )
                }
            </LoginDispatchContext.Consumer>
        )
    }
}