import React, {createContext, useContext, useEffect, useState} from 'react';
import {getAuth, getToken} from "../helpers/sessionHelper";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
    axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;

    useEffect(()=>{
        const user = getAuth();

        if (user){
            setAuth(user);
            setToken(getToken())
            setLoading(false);
        }
        setLoading(false);

    }, [])

    const value = {
        auth, setAuth, token, setToken, loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;