"use client";
import React, { createContext, useContext, useState } from 'react';

// Create the context
const RightPanelContext = createContext();

// Custom hook to use the context
export function useRightPanel() {
  return useContext(RightPanelContext);
}

// Context provider
export function RightPanelProvider({ children }) {
  const [response, setResponse] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(true);

  return (
    <RightPanelContext.Provider value={{  response, setResponse, isDrawerOpen, setDrawerOpen }}>
      {children}
    </RightPanelContext.Provider>
  );
}
