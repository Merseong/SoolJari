import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {
    Button,
    Icon
} from "semantic-ui-react";
import { getFirestoreDB } from "../firestore/FirestoreActions"

export interface LoginButtonProps {
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

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then(result => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            //const credential = result.credential as firebase.auth.OAuthCredential;
            //const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            //console.log(token, user);
            this.setState({
                isLogin: true,
                isAdmin: user?.email === 'esc990720@korea.ac.kr' || user?.email === 'esc990720@gmail.com',
            })
            console.log('Google Login');

            /// Firestore test start
            const db = getFirestoreDB();
            db.collection('cards').doc('DR6oLGzTVd0Yg1dfRgqI').get()
            .then(doc => {
                console.log(doc.data());
            })
            .catch(e => {
                console.error(e);
            })
            /// Firestore test end
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

    logout() {
        if (this.state.isLogin) {
            firebase.auth().signOut()
            .then(() => {
                this.setState({
                    isLogin: false,
                    isAdmin: false,
                })
                console.log('Logout');
            })
            .catch(e => {
                console.error(e)
            });
        }
    }

    render() {
        const { isLogin, isAdmin } = this.state;

        return (
            isLogin ?
                isAdmin ?
                    <Button
                        basic
                        color='green'
                        icon={<Icon fitted size='large' name='user'/>}
                        onClick={() => this.logout()}
                    />
                    :
                    <Button
                        basic
                        color='red'
                        icon={<Icon fitted size='large' name='user'/>}
                        onClick={() => this.logout()}
                    />
                :
                <Button
                    basic
                    icon={<Icon fitted size='large' name='user'/>}
                    onClick={() => this.googleLogin()}
                />
        )
    }
}