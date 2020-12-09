import React, { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "./reducer";

export const AuthContext = createContext({
  user: undefined,
  logged: false,
});

const getInitialState = () => {
  if (typeof window === "undefined") return false;
  if (JSON.parse(localStorage.getItem("logged"))) {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      logged: JSON.parse(localStorage.getItem("logged")),
    };
  } else {
    return { logged: false, user: undefined };
  }
};
const AuthProvider = ({ children }) => {
  const [data, dispatch] = useReducer(authReducer, getInitialState());

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("logged", JSON.stringify(data.logged));
  }, [data]);

  return (
    <AuthContext.Provider value={{ data, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
