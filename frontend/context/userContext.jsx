import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const UserContext = createContext({})

export function UserContextProvider({children}){

    const [user,setUser] = useState('')
    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/user/profile',{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token") 
            }
        }).then(({data})=>{
            setUser(data)
        })
    },[])

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )

}