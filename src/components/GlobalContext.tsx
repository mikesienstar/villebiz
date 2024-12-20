"use client"
import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext({});

export const GlobalProvider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
}>) => {
  const [globalState, setGlobalState] = useState({
    BASE_URL:`http://localhost:3000`,
    user: null,
    cart: [],
    // Add other global states here
  });

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);