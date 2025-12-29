import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const storedToken = localStorage.getItem("token");
  const storedTime = localStorage.getItem("loginTime"); // timestamp in ms
  const [token, setToken] = useState(storedToken);

  const isLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
  };

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("loginTime", Date.now());
  };

  useEffect(() => {
    if (storedToken && storedTime) {
      const remainingTime = 5 * 60 * 1000 - (Date.now() - parseInt(storedTime));
      if (remainingTime <= 0) {
        logoutHandler();
      } else {
        const timer = setTimeout(logoutHandler, remainingTime);
        return () => clearTimeout(timer);
      }
    }
  }, [storedToken, storedTime]);

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
