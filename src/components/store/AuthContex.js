import React,{useState} from "react"
const AuthContext=React.createContext({
    token:"",
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
});

export const AuthContextProvider=(props)=>{
    const [token,setToken]=useState(null);

    const userLoggedIn=!!token;
    const logInHandler=(token)=>{
        setToken(token);
    };
    const LogOutHandler=()=>{
        setToken(null);
    };
    return(
        <AuthContext.Provider value={{token:token, isLoggedIn:userLoggedIn, login:logInHandler, logout:LogOutHandler}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;