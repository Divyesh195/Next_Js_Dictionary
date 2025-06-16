"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';

// Create context
const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(()=>{
    const Localtoken = localStorage.getItem('Dtoken')
    if(Localtoken){
      setToken(Localtoken)
    }
  },[])

  const value = {token, setToken}
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);