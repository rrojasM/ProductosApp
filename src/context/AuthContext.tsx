import React, { createContext, useReducer } from "react";
import { Usuario, LoginResponse, LoginData } from '../interfaces/AppInterfaces';
import { authReducer, AuthState } from "../context/authReducer";
import productosApi from '../api/ProductosApi';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';

    singUp: () => void;
    singIn: (loginData: LoginData) => void;
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

    const singIn = async ({ correo, password }: LoginData) => {
        try {
            const resp = await productosApi.post<LoginResponse>('/auth/login', { correo, password });
            console.log(JSON.stringify(resp.data, null, 2));
        } catch (error:any) {
            console.log(JSON.stringify(error.response.data.msg, null, 2));

        }
    }
    const singUp = () => { };
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