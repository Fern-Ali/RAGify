# MCP Integration Guide

This document provides an overview of the Model Context Protocol (MCP) integration in RAGify using JSON-RPC 2.0.

## Overview

The MCP integration allows RAGify to connect to a remote MCP gateway and interact with various tools through JSON-RPC 2.0 protocol. The implementation includes:

- **MCP Context Provider**: Manages connection state, tools, prompts, resources, and execution tracking
- **MCP API Route**: Handles JSON-RPC 2.0 communication with the remote gateway
- **MCP Chat Component**: User interface for executing tools with JSON arguments
- **MCP Tools Sidebar**: Visual display of available tools with execution status
- **MCP Page**: Dedicated page for MCP interactions

## Architecture

### Components Structure

```
app/
├── (dashboard)/
│   ├── mcp/
│   │   └── page.tsx              # Main MCP page
│   ├── components/
│   │   ├── McpChat.js            # Tool execution interface
│   │   └── McpToolsSidebar.js    # Tools display sidebar
│   ├── contexts/
│   │   └── McpContext.js         # State management
│   └── layout.tsx                # Updated with MCP sidebar logic
├── api/
│   └── mcp/
│       └── route.js              # JSON-RPC 2.0 proxy endpoint
└── layout.tsx                    # Updated navigation with MCP link
```

### Data Flow

1. **Tool Loading**: On MCP page mount, `McpContext` fetches available tools via JSON-RPC `tools/list`
2. **Tool Execution**: User enters tool name + JSON args → `callTool()` → JSON-RPC `tools/call` → Gateway executes
3. **Real-time Updates**: `executingTools` Set tracks active executions, `toolResults` stores outcomes

## JSON-RPC 2.0 Protocol

### Request Format
All requests to `/api/mcp` use JSON-RPC 2.0 format:

```json
{
  "jsonrpc": "2.0",
  "id": "1739585221072-abc123",
  "method": "tools/call",
  "params": {
    "name": "search",
    "arguments": { "query": "foo" }
  }
}
```

### Response Format
Successful response:
```json
{
  "jsonrpc": "2.0",
  "id": "1739585221072-abc123",
  "result": { /* tool output */ }
}
```

Error response:
```json
{
  "jsonrpc": "2.0",
  "id": null,
  "error": {
    "code": -32603,
    "message": "Internal error",
    "data": { /* optional error details */ }
  }
}
```

### Error Codes
- `-32700`: Parse error (malformed JSON)
- `-32600`: Invalid request (missing required fields)
- `-32001`: Unauthorized
- `-32603`: Internal error

## API Endpoint

### POST /api/mcp
Single endpoint for all MCP operations via JSON-RPC 2.0.

**Request:**
```json
{
  "method": "tools/list",
  "params": {}
}
```

**Response:**
```json
{
  "jsonrpc": "2.0",
  "id": "...",
  "result": {
    "tools": [
      {
        "name": "search",
        "description": "Search for information",
        "inputSchema": {
          "type": "object",
          "properties": {
            "query": { "type": "string" }
          },
          "required": ["query"]
        }
      }
    ]
  }
}
```

## MCP Gateway Configuration

The integration connects to: `http://143.198.108.210:8000/mcp`

This gateway URL is configurable via environment variable:
```bash
MCP_GATEWAY_URL=http://143.198.108.210:8000/mcp
```

### Available JSON-RPC Methods:
- `tools/list` - List available tools
- `tools/call` - Execute a specific tool
- `prompts/list` - List available prompts
- `resources/list` - List available resources

## Components

### McpContext

**Purpose**: Centralized state management for MCP functionality

**State:**
- `tools`: Array of available MCP tools
- `prompts`: Array of available prompts
- `resources`: Array of available resources
- `messages`: Chat message history (for future use)
- `isConnected`: Connection status to gateway
- `isLoading`: Loading state for async operations
- `executingTools`: Set of currently executing tool names
- `toolResults`: Map of tool execution results

**Methods:**
- `fetchTools()`: Load tools using `tools/list`
- `fetchPrompts()`: Load prompts using `prompts/list`
- `fetchResources()`: Load resources using `resources/list`
- `callTool(name, arguments)`: Execute tool using `tools/call`
- `sendMessage(message)`: Send message (if gateway supports)
- `clearMessages()`: Reset chat history
- `clearToolResults()`: Reset tool execution results

### McpChat Component

**Features:**
- Tool name input field
- JSON arguments textarea (multiline)
- Displays tool execution results with syntax highlighting
- Shows executing tools with loading indicators
- Success/error indicators with timestamps
- Validates JSON before submission

**User Experience:**
- Empty state with usage examples
- Real-time execution feedback
- Pretty-printed JSON results
- Color-coded success/error states

### McpToolsSidebar Component

**Features:**
- Auto-loads and displays all available tools as cards
- Shows tool details: name, description, parameters
- Visual feedback for executing tools (pulse animation)
- Success/error indicators for tool results
- Expandable accordions for parameter details
- Color-coded tool categories

**Visual Elements:**
- Dynamic icons based on tool type
- Animated borders during execution
- Result alerts with timestamps
- Parameter chips with required indicator

### MCP Page

**Layout:**
- Page header with title and description
- Main content area with tool execution interface
- Right sidebar with tools list (via dashboard layout)
- Responsive design following app patterns

## Navigation

The MCP page is accessible via the main navigation with:
- **Icon**: ExtensionIcon
- **Title**: MCP Gateway
- **Route**: `/mcp`

## Usage Example

```javascript
import { useMcp } from '../contexts/McpContext';

function MyComponent() {
  const { tools, callTool, isLoading } = useMcp();
  
  const handleExecute = async () => {
    try {
      const result = await callTool("search", { query: "test" });
      console.log("Result:", result);
    } catch (error) {
      console.error("Failed to execute tool:", error);
    }
  };
  
  return (
    <div>
      <p>Available tools: {tools.length}</p>
      <button onClick={handleExecute} disabled={isLoading}>
        Execute Tool
      </button>
    </div>
  );
}
```

## Protocol Example

### List Tools
**Request:**
```bash
POST /api/mcp
Content-Type: application/json

{
  "method": "tools/list",
  "params": {}
}
```

**Response:**
```json
{
  "jsonrpc": "2.0",
  "id": "1739585221072-abc123",
  "result": {
    "tools": [...]
  }
}
```

### Execute Tool
**Request:**
```bash
POST /api/mcp
Content-Type: application/json

{
  "method": "tools/call",
  "params": {
    "name": "search",
    "arguments": { "query": "foo" }
  }
}
```

**Response:**
```json
{
  "jsonrpc": "2.0",
  "id": "1739585221072-def456",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Search results..."
      }
    ]
  }
}
```

## Error Handling

The implementation includes comprehensive error handling:
- JSON parsing errors (code -32700)
- Invalid requests (code -32600)
- Unauthorized access (code -32001)
- Internal errors (code -32603)
- User notifications for all error states
- Graceful degradation when gateway is unavailable

## Testing

To test the MCP integration:

1. Ensure the gateway is accessible at `http://143.198.108.210:8000/mcp`
2. Navigate to `/mcp` in the app
3. View available tools in the right sidebar
4. Enter a tool name (e.g., "search")
5. Enter JSON arguments (e.g., `{"query": "test"}`)
6. Click send and observe the result

## Troubleshooting

**Tools not loading:**
- Check network connectivity to gateway
- Verify gateway URL is correct
- Check browser console for JSON-RPC errors

**Tool execution failing:**
- Validate JSON arguments syntax
- Ensure tool name matches available tools
- Check for required parameters

**JSON-RPC errors:**
- Code -32600: Check request format
- Code -32001: Authentication may be required
- Code -32603: Gateway internal error

