import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import firebase from 'firebase';

/**
 * https://velog.io/@velopert/typescript-context-api
 */

export type LoginState = {
    isLogin: boolean;
    isAdmin: boolean;
    loginData: firebase.User | null;
}

export const LoginStateContext = createContext<LoginState | undefined>(undefined);

type LoginAction = 
    | { type: 'LOGIN'; isAdmin: boolean; loginData: firebase.User | null; }
    | { type: 'LOGOUT'; };

export type LoginDispatch = Dispatch<LoginAction>;
export const LoginDispatchContext = createContext<LoginDispatch | undefined>(
    undefined
);

function loginReducer(state: LoginState, action: LoginAction): LoginState {
    switch (action.type) {
        case 'LOGIN':
            if (!action.loginData) {
                console.error('Login Failed with empty loginData');
                return state;
            } else {
                return {
                    isLogin: true,
                    isAdmin: action.isAdmin,
                    loginData: action.loginData,
                };
            }
        case 'LOGOUT':
            return {
                isLogin: false,
                isAdmin: false,
                loginData: null,
            }
    }
}

export function LoginContextProvider({ children }: { children: React.ReactNode }) {
    const [loginState, dispatch] = useReducer(loginReducer, {
        isLogin: false,
        isAdmin: false,
        loginData: null,
    });

    return (
        <LoginDispatchContext.Provider value={dispatch}>
            <LoginStateContext.Provider value={loginState}>
                {children}
            </LoginStateContext.Provider>
        </LoginDispatchContext.Provider>
    )
}

export function useLoginState() {
    const state = useContext(LoginStateContext);
    if (!state) throw new Error('LoginProvider not found');
    return state;
}

export function useLoginDispatch() {
    const dispatch = useContext(LoginDispatchContext);
    if (!dispatch) throw new Error('LoginProvider not found');
    return dispatch;
}
