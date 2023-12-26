import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    })

    useEffect(()=>{
        const parsedData=JSON.parse(localStorage.getItem("authData"))
        if(parsedData){
            setAuth({
                ...auth,
                user:parsedData.user,
                token:parsedData.token
            })
        }
    },[])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//custom hook
const useAuth = () => {
    return useContext(AuthContext)
}

export { useAuth, AuthProvider }