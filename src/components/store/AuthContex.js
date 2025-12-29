import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {

  const storedToken=localStorage.getItem("token");
  const [token, setToken] = useState(storedToken);

  const isLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const loginHandler = (token) => {
    
    setToken(token);
    localStorage.setItem("token",token);
  };


  return (
    <AuthContext.Provider
      value={{
        token:token,
        isLoggedIn:isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
