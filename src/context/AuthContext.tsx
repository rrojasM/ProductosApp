import React, { Children, createContext, useReducer } from "react";
import { Usuario } from "../interfaces/AppInterfaces";
import { authReducer, AuthState } from "./AuthReducer";

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';

    singUp: () => void;
    singIn: () => void;
    logOut: () => void;
    removeError: () => void;
}


const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispach] = useReducer(authReducer, authInitialState);
    const singUp = () => { };
    const singIn = () => { };
    const logOut = () => { };
    const removeError = () => { };

    return (
        <AuthContext.Provider value={{
            ...state,
            singUp,
            singIn,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    )
}