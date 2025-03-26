"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

import { prisma } from "../lib/prisma"; 


// Define the context
const LatestThreadContext = createContext(null);

// Custom hook to use the context
export const useLatestThread = () => useContext(LatestThreadContext);

// Provider component
export const LatestThreadProvider = ({ userId, response, children }) => {
  const [latestThread, setLatestThread] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestThread = async () => {
      try {
        const response = await fetch(`/api/getUserMessages?userId=${userId}`);
        const data = await response.json();

        if (response.ok) {
          setLatestThread(data.thread);
        } else {
          console.error('Error fetching thread:', data.error);
        }
      } catch (error) {
        console.error('Error fetching thread:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchLatestThread();
    }
  }, [userId, response]);

  return (
    <LatestThreadContext.Provider value={{ latestThread, loading }}>
      {children}
    </LatestThreadContext.Provider>
  );
};
