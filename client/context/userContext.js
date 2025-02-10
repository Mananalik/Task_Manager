import React , {createContext, useEffect , useState, useContext} from 'react';

const UserContext = React.createContext();// store and provide values (like user information, authentication state, etc.) to child components.

export const UserContextProvider = ({children})=>{
    return (
        <UserContext.Provider value={"Hello"}>
            {children}
            </UserContext.Provider>
        
    );
};

export const useUserContext=()=>{
    return useContext(UserContext)
};