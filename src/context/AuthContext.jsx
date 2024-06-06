import React, { createContext, useContext, useState } from 'react';
import { clearToken, getToken, setToken } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setAuthToken] = useState(getToken());

  const saveToken = (userToken) => {
    setToken(userToken);
    setAuthToken(userToken);
  };

  const removeToken = () => {
    clearToken();
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
