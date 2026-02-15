"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';

// Define the context
const McpContext = createContext(null);

// Custom hook to use the context
export const useMcp = () => useContext(McpContext);

// Provider component
export const McpProvider = ({ children }) => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available tools from MCP
  const fetchTools = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("[McpContext] Fetching tools...");
      
      const response = await fetch("/api/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "tools/list",
          params: {}
        })
      });
      
      const data = await response.json();
      console.log("[McpContext] Tools response:", data);
      
      // Check for JSON-RPC error
      if (data.error) {
        throw new Error(data.error.message || "Failed to fetch tools");
      }
      
      // JSON-RPC returns result in 'result' field
      const tools = data.result?.tools || [];
      setTools(tools);
      console.log("[McpContext] Tools loaded:", tools);
      
      return tools;
    } catch (err) {
      console.error("[McpContext] Error fetching tools:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Call a specific tool
  const callTool = useCallback(async (toolName, toolArguments = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("[McpContext] Calling tool:", toolName, "with arguments:", toolArguments);
      
      const response = await fetch("/api/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "tools/call",
          params: {
            name: toolName,
            arguments: toolArguments
          }
        })
      });
      
      const data = await response.json();
      console.log("[McpContext] Tool call response:", data);
      
      // Check for JSON-RPC error
      if (data.error) {
        throw new Error(data.error.message || "Failed to call tool");
      }
      
      // JSON-RPC returns result in 'result' field
      return data.result;
    } catch (err) {
      console.error("[McpContext] Error calling tool:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // List available prompts (optional)
  const fetchPrompts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("[McpContext] Fetching prompts...");
      
      const response = await fetch("/api/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "prompts/list",
          params: {}
        })
      });
      
      const data = await response.json();
      console.log("[McpContext] Prompts response:", data);
      
      // Check for JSON-RPC error
      if (data.error) {
        throw new Error(data.error.message || "Failed to fetch prompts");
      }
      
      return data.result?.prompts || [];
    } catch (err) {
      console.error("[McpContext] Error fetching prompts:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // List available resources (optional)
  const fetchResources = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("[McpContext] Fetching resources...");
      
      const response = await fetch("/api/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "resources/list",
          params: {}
        })
      });
      
      const data = await response.json();
      console.log("[McpContext] Resources response:", data);
      
      // Check for JSON-RPC error
      if (data.error) {
        throw new Error(data.error.message || "Failed to fetch resources");
      }
      
      return data.result?.resources || [];
    } catch (err) {
      console.error("[McpContext] Error fetching resources:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    tools,
    loading,
    error,
    fetchTools,
    callTool,
    fetchPrompts,
    fetchResources,
  };

  return (
    <McpContext.Provider value={value}>
      {children}
    </McpContext.Provider>
  );
};
