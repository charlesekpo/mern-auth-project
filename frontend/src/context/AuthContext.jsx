import {createContext, useState, useContext, useEffect} from 'react';
import API from '../api/axios';

// A container for global states
const AuthContext = createContext();

// a wrapper component for all application
export const AuthProvider =({children})=>{
    //user is initially empty until after login
    const[user, setUser] = useState(null);

    // we need to track whether we have finished checking the cookie
    // so we start as true because we are checking on load
    // once check is done it becomes false
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        // runs once when the app first loads
        // checks if a valid cookie exists and restores the user
        const checkAuth = async () => {
            try {
                // calls /me route — if cookie exists and is valid
                // backend returns the user object
                const response = await API.get('/me');
                setUser(response.data);
            } catch (error) {
                // no valid cookie or token expired
                // user stays null — they will need to login
                setUser(null);
            } finally {
                // whether success or failure, we are done checking
                setChecking(false);
            }
        };

        checkAuth();
    }, []);

    //set the user after login function is called
    const login = (userData)=>{
        setUser(userData);
    };

    // clear the logged in user when the logout is called
    const logout=()=>{
        setUser(null);
    };

    // while checking the cookie, show nothing
    // this prevents the brief flash of redirecting to /login
    if (checking) {
        return <div>Loading...</div>;
    }

    // now fill the empty container created. Other components can go in and access
    return(<AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider> );
};

export const useAuth = () => useContext(AuthContext);

