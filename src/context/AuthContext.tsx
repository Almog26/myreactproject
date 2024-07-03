import  { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';
import { JwtPayload } from '../@types/types';
import * as auth from "../services/auth";


interface AuthContextType {
    isLoggedIn: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isBusiness: boolean;
    isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    token: null,
    login: async () => {},
    logout: () => {},
    isBusiness: false,
    isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isBusiness, setIsBusiness] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const decodeToken = (jwt: string) => {
        try {
            return jwtDecode<JwtPayload>(jwt);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    useEffect(() => {
        const t = localStorage.getItem('token');
        console.log('Token from localStorage:', t);
        if (t && typeof t === 'string' && t.split('.').length === 3) { // בדיקת תקינות הטוקן
            const decoded = decodeToken(t);
            if (decoded) {
                console.log('Decoded token on load:', decoded);
                setToken(t);
                setIsLoggedIn(true);
                setIsBusiness(decoded.isBusiness);
                setIsAdmin(decoded.isAdmin);
              
            } else {
                console.error('Failed to decode token on load');
                setIsLoggedIn(false);
                setIsBusiness(false);
                setIsAdmin(false);
            }
        } else {
            console.error('No token found in localStorage or token is not a valid string');
        }
    }, []);

    const login = async (email: string, password: string) => {
        console.log('Attempting to login with email and password:', email, password);
        try {
            const token = await auth.login({ email, password });
            console.log('Login API response:', token); // הודעת ניפוי להצגת התגובה מהשרת
            if (typeof token === 'string' && token.split('.').length === 3) { // בדיקת תקינות הטוקן
                const decoded = decodeToken(token);
                if (decoded) {
                    console.log('Decoded token during login:', decoded);
                    localStorage.setItem('token', token);
                    setToken(token);
                    setIsLoggedIn(true);
                    setIsBusiness(decoded.isBusiness);
                    setIsAdmin(decoded.isAdmin);
                    
                } else {
                    console.error('Invalid token during login');
                }
            } else {
                console.error('Token is not a valid string:', token);
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        console.log('Logging out');
        setIsLoggedIn(false);
        setIsBusiness(false);
        setIsAdmin(false);
        localStorage.removeItem('token');
        setToken(null);
        
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, login, logout, isBusiness, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
