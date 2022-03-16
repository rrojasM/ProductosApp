import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario, LoginResponse, LoginData, RegisterData } from '../interfaces/AppInterfaces';
import { authReducer, AuthState } from "../context/authReducer";
import productosApi from '../api/ProductosApi';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';

    singUp: (registerData: RegisterData) => void;
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

    useEffect(() => {
        validarToken();
    }, []);

    const validarToken = async () => {
        const token = await AsyncStorage.getItem('token');

        //NO TOKEN NO AUTENTICADO
        if (!token) return dispach({ type: 'notAuthenticated' });


        //HAY TOKEN
        const resp = await productosApi.get('/auth')
        if (resp.status !== 200) {
            return dispach({ type: 'notAuthenticated' })
        }
        await AsyncStorage.setItem('token', resp.data.token);

        dispach({
            type: 'singUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }
        });

    }


    const singIn = async ({ correo, password }: LoginData) => {
        try {
            const { data } = await productosApi.post<LoginResponse>('/auth/login', { correo, password });

            dispach({
                type: 'singUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });

            await AsyncStorage.setItem('token', data.token);
        } catch (error: any) {
            dispach({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta'
            })
        }
    }

    const singUp = async ({ nombre, correo, password }: RegisterData) => {
        try {
            const resp = await productosApi.post<LoginResponse>('/usuarios', { nombre, correo, password, rol: 'USER_ROLE' });
            dispach({
                type: 'singUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario
                }
            });

            await AsyncStorage.setItem('token', resp.data.token);
        } catch (error: any) {
            dispach({
                type: 'addError',
                payload: error.response.data.errors[0].msg || 'Usuario no registrado'
            })
        }
    };

    const logOut = async () => {
        await AsyncStorage.removeItem('token');

        dispach({
            type: 'logout'
        })
    };

    const removeError = () => {
        dispach({
            type: 'removeError'
        })
    };

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