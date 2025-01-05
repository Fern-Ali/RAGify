"use client";
import React, { useState, useEffect, createContext, useContext } from 'react';

const LeftPanelContext = createContext();

export function useLeftPanel() {
  const context = useContext(LeftPanelContext);
  if (!context) {
    throw new Error('useLeftPanel must be used within a LeftPanelProvider');
  }
  return context;
}

export function LeftPanelProvider({ children }) {
  const [isNavigationExpanded, setIsNavigationExpanded] = useState(true);
  const [leftPanelWidth, setLeftPanelWidth] = useState(320);

  useEffect(() => {
    const toggleButton = document.querySelector('[aria-label="Collapse navigation menu"]'); // Adjust selector
    if (!toggleButton) return;

    const handleClick = () => {
      setIsNavigationExpanded((prev) => !prev);
      console.log(isNavigationExpanded);
      setLeftPanelWidth((prev) => (prev === 320 ? 64 : 320));
    };

    toggleButton.addEventListener('click', handleClick);
    return () => toggleButton.removeEventListener('click', handleClick); // Cleanup on unmount
  }, []);

  return (
    <LeftPanelContext.Provider value={{ isNavigationExpanded, leftPanelWidth }}>
      {children}
    </LeftPanelContext.Provider>
  );
}

