import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({})
export function UserContextProvider({children}){
    const [user , setUser] = useState({})
    useEffect(() => {
        // fetch user data from server
        setUser({id:1, name:'John Doe',type:'student',messages:[{name:'Jhone Doe',from:1,mes:'hello',photo:'/src/assets/profile.gif',date:Date.now()},{name:'Jhone Doe',from:1,mes:'hello this is to inform you that ',photo:'/src/assets/profile.gif',date:Date.now()},{name:'Jhone Doe',from:1,mes:'hello this is to inform you that ',photo:'/src/assets/profile.gif',date:Date.now()},{name:'Jhone Doe',from:1,mes:'hello this is to inform you that ',photo:'/src/assets/profile.gif',date:Date.now()},{name:'Jhone Doe',from:1,mes:'hello this is to inform you that ',photo:'/src/assets/profile.gif',date:Date.now()}]})
    }, [])
    return (
        <UserContext.Provider value = {{user,setUser}}>
            {children}
        </UserContext.Provider>
    );
}

