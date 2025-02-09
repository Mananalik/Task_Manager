import React , {createContext, userEffect , userState, useContext} from 'react';

const UserContext = React.createContext();

export const UserContextProvider = ({children})=>{
    return (
        <UserContext.Provider value={"Hello"}>
            {children}
            </UserContext.Provider>
        
    );
};