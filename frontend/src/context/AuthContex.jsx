import {createContext, useState, useContext} from 'react';

// A container for global states
const AuthContext = createContext();

// a wrapper component for all application
const AuthProvider =({children})=>{
    //user is initially empty until after login
    const[user, setUser] = useState(null);

    //set the user after login function is called
    const login = (userData)=>{
        setUser(userData);
    };

    // clear the logged in user when the logout is called
    const logout=()=>{
        setUser(null);
    };

    // now fill the empty container created. Other components can go in and access
    return(<AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider> );
};

export const useAuth = () => useContext(AuthContext);

