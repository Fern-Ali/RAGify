"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the context
const McpContext = createContext();

// Custom hook to use the context
export function useMcp() {
  const context = useContext(McpContext);
  if (!context) {
    throw new Error('useMcp must be used within a McpProvider');
  }
  return context;
}

// Context provider
export function McpProvider({ children }) {
  const [tools, setTools] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [executingTools, setExecutingTools] = useState(new Set());
  const [toolResults, setToolResults] = useState({});

  // Fetch available tools from the MCP gateway
  const fetchTools = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/mcp', {
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch tools: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setTools(data.tools || []);
      setIsConnected(true);
      return data.tools;
    } catch (error) {
      console.error('Error fetching tools:', error);
      setIsConnected(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Send a message to the MCP chat
  const sendMessage = useCallback(async (message) => {
    try {
      setIsLoading(true);
      
      // Add user message to the UI immediately
      const userMessage = {
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMessage]);

      const response = await fetch('/api/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'chat',
          message,
          history: messages,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Add assistant response to messages
      if (data.response) {
        const assistantMessage = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString(),
          toolCalls: data.toolCalls,
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
      
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  // Execute a tool
  const executeTool = useCallback(async (toolName, parameters) => {
    try {
      // Mark tool as executing
      setExecutingTools(prev => new Set([...prev, toolName]));
      
      const response = await fetch('/api/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'executeTool',
          toolName,
          parameters,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to execute tool '${toolName}': ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Store tool result
      setToolResults(prev => ({
        ...prev,
        [toolName]: {
          result: data.result,
          timestamp: new Date().toISOString(),
          success: true,
        },
      }));
      
      return data;
    } catch (error) {
      console.error('Error executing tool:', error);
      setToolResults(prev => ({
        ...prev,
        [toolName]: {
          error: error.message,
          timestamp: new Date().toISOString(),
          success: false,
        },
      }));
      throw error;
    } finally {
      // Remove tool from executing set
      setExecutingTools(prev => {
        const newSet = new Set(prev);
        newSet.delete(toolName);
        return newSet;
      });
    }
  }, []);

  // Clear messages
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  // Clear tool results
  const clearToolResults = useCallback(() => {
    setToolResults({});
  }, []);

  const value = {
    tools,
    messages,
    isConnected,
    isLoading,
    executingTools,
    toolResults,
    fetchTools,
    sendMessage,
    executeTool,
    clearMessages,
    clearToolResults,
  };

  return (
    <McpContext.Provider value={value}>
      {children}
    </McpContext.Provider>
  );
}
