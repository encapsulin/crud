import React, { createContext, useContext, useState } from 'react';

// Create a context for user data
const AuthDataContext = createContext();

// Custom hook to use UserDataContext
export function useAuthData() {
    return useContext(AuthDataContext);
}

// Provider component that wraps your app and makes user data available
export function AuthDataProvider({ children }) {
    const [jwt, setJwt] = useState(null);

    const setToken = (token) => {
        setJwt(token);
    };

    const getToken = () => {
        return jwt;
    };

    return (
        <AuthDataContext.Provider value={{ jwt, setToken, getToken }}>
            {children}
        </AuthDataContext.Provider>
    );
}
