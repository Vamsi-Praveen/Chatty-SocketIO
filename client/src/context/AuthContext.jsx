import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    useEffect(() => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }, [token, user]);

    return (
        <AuthContext.Provider value={{ token, user, setToken, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
