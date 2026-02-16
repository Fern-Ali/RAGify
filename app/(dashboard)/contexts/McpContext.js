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
  const [prompts, setPrompts] = useState([]);
  const [resources, setResources] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [executingTools, setExecutingTools] = useState(new Set());
  const [toolResults, setToolResults] = useState({});

  // Make a JSON-RPC request to the MCP gateway
  const makeRpcRequest = useCallback(async (method, params = {}, sessionId = null) => {
    const requestId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    const response = await fetch('/api/mcp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method,
        params,
        id: requestId,
        sessionId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Handle JSON-RPC error response
    if (data.error) {
      const error = new Error(data.error.message || 'JSON-RPC error');
      error.code = data.error.code;
      throw error;
    }

    return data.result;
  }, []);

  // Fetch available tools from the MCP gateway
  const fetchTools = useCallback(async (sessionId = null) => {
    try {
      setIsLoading(true);
      const result = await makeRpcRequest('tools/list', {}, sessionId);
      setTools(result.tools || []);
      setIsConnected(true);
      return result.tools;
    } catch (error) {
      console.error('Error fetching tools:', error);
      setIsConnected(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [makeRpcRequest]);

  // Fetch available prompts from the MCP gateway
  const fetchPrompts = useCallback(async (sessionId = null) => {
    try {
      setIsLoading(true);
      const result = await makeRpcRequest('prompts/list', {}, sessionId);
      setPrompts(result.prompts || []);
      return result.prompts;
    } catch (error) {
      console.error('Error fetching prompts:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [makeRpcRequest]);

  // Fetch available resources from the MCP gateway
  const fetchResources = useCallback(async (sessionId = null) => {
    try {
      setIsLoading(true);
      const result = await makeRpcRequest('resources/list', {}, sessionId);
      setResources(result.resources || []);
      return result.resources;
    } catch (error) {
      console.error('Error fetching resources:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [makeRpcRequest]);

  // Call a tool with arguments
  const callTool = useCallback(async (name, argumentsObj = {}, sessionId = null) => {
    try {
      // Mark tool as executing
      setExecutingTools(prev => new Set([...prev, name]));

      const result = await makeRpcRequest('tools/call', {
        name,
        arguments: argumentsObj,
      }, sessionId);

      // Store tool result
      setToolResults(prev => ({
        ...prev,
        [name]: {
          result,
          timestamp: new Date().toISOString(),
          success: true,
        },
      }));

      return result;
    } catch (error) {
      console.error('Error calling tool:', error);
      setToolResults(prev => ({
        ...prev,
        [name]: {
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
        newSet.delete(name);
        return newSet;
      });
    }
  }, [makeRpcRequest]);

  // Send a message (for future chat functionality if supported)
  const sendMessage = useCallback(async (message, sessionId = null) => {
    try {
      setIsLoading(true);

      // Add user message to the UI immediately
      const userMessage = {
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMessage]);

      // Note: This assumes the gateway might support a message method
      // Adjust based on actual gateway capabilities
      const result = await makeRpcRequest('message', {
        message,
        history: messages,
      }, sessionId);

      // Add assistant response to messages
      if (result.response || result.content) {
        const assistantMessage = {
          role: 'assistant',
          content: result.response || result.content,
          timestamp: new Date().toISOString(),
          toolCalls: result.toolCalls,
        };
        setMessages(prev => [...prev, assistantMessage]);
      }

      return result;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [messages, makeRpcRequest]);

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
    prompts,
    resources,
    messages,
    isConnected,
    isLoading,
    executingTools,
    toolResults,
    fetchTools,
    fetchPrompts,
    fetchResources,
    callTool,
    sendMessage,
    clearMessages,
    clearToolResults,
  };

  return (
    <McpContext.Provider value={value}>
      {children}
    </McpContext.Provider>
  );
}

