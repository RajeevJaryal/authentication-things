import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {


  const [token, setToken] = useState(null);

  const isLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
  };

  const loginHandler = (token) => {
    setToken(token);
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
