# MCP Integration Documentation

## Overview

This application now supports the Model Context Protocol (MCP) using JSON-RPC 2.0 for communication with MCP gateways.

## Architecture

### Components

1. **MCP API Route** (`app/api/mcp/route.js`)
   - Handles all MCP requests using JSON-RPC 2.0 protocol
   - Single endpoint: `/api/mcp`
   - Forwards requests to MCP gateway at `http://143.198.108.210:8000/mcp`
   - Includes authentication checks

2. **McpContext** (`app/(dashboard)/contexts/McpContext.js`)
   - React context for managing MCP state
   - Provides functions: `fetchTools`, `callTool`, `fetchPrompts`, `fetchResources`
   - Handles JSON-RPC response parsing and error handling

3. **MCP Components**
   - `McpToolsSidebar`: Displays available MCP tools
   - `McpChat`: Interface for executing MCP tools

4. **Demo Page** (`/mcp`)
   - Interactive demo page for testing MCP integration
   - Shows tools list and allows tool execution

## JSON-RPC 2.0 Protocol

### Request Format

All requests to `/api/mcp` should use this format:

```json
{
  "method": "tools/list",
  "params": {}
}
```

### Response Format

**Success Response:**
```json
{
  "jsonrpc": "2.0",
  "id": 1234567890,
  "result": {
    "tools": [
      {
        "name": "tool_name",
        "description": "Tool description",
        "inputSchema": { ... }
      }
    ]
  }
}
```

**Error Response:**
```json
{
  "jsonrpc": "2.0",
  "id": 1234567890,
  "error": {
    "code": -32603,
    "message": "Error message"
  }
}
```

## Supported MCP Methods

### 1. List Tools
```javascript
{
  "method": "tools/list",
  "params": {}
}
```

### 2. Call Tool
```javascript
{
  "method": "tools/call",
  "params": {
    "name": "tool_name",
    "arguments": {
      "param1": "value1"
    }
  }
}
```

### 3. List Prompts (Optional)
```javascript
{
  "method": "prompts/list",
  "params": {}
}
```

### 4. List Resources (Optional)
```javascript
{
  "method": "resources/list",
  "params": {}
}
```

## Usage Examples

### Using McpContext

```javascript
import { McpProvider, useMcp } from '../contexts/McpContext';

function MyComponent() {
  const { tools, loading, error, fetchTools, callTool } = useMcp();

  useEffect(() => {
    fetchTools();
  }, []);

  const handleToolCall = async () => {
    const result = await callTool('tool_name', { param: 'value' });
    console.log(result);
  };

  return (
    <div>
      {tools.map(tool => (
        <div key={tool.name}>{tool.name}</div>
      ))}
    </div>
  );
}

// Wrap with provider
function App() {
  return (
    <McpProvider>
      <MyComponent />
    </McpProvider>
  );
}
```

### Direct API Calls

```javascript
// Fetch tools
const response = await fetch('/api/mcp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    method: 'tools/list',
    params: {}
  })
});

const data = await response.json();
if (data.error) {
  console.error(data.error.message);
} else {
  console.log(data.result);
}
```

## Error Handling

The integration includes comprehensive error handling:

1. **Network Errors**: Caught and wrapped in JSON-RPC error format
2. **Gateway Errors**: MCP gateway errors are forwarded to the client
3. **Authentication Errors**: Returns 401 with JSON-RPC error
4. **Validation Errors**: Returns 400 with JSON-RPC error

### Common Error Codes

- `-32600`: Invalid Request
- `-32001`: Unauthorized (Custom)
- `-32603`: Internal Error
- `-32700`: Parse Error

## Testing

### Manual Testing

1. Navigate to `/mcp` page
2. The tools list should load automatically
3. Select a tool from the sidebar
4. Enter tool arguments in JSON format
5. Click "Execute Tool" to test tool execution

### Expected Behavior

✅ Tools list loads successfully  
✅ Tools display in the sidebar  
✅ Tool execution works  
✅ No 404 errors in logs  
✅ Proper JSON-RPC requests/responses in console  

## Configuration

The MCP gateway URL is currently hardcoded in the API route. To change it, edit:

```javascript
// app/api/mcp/route.js
const response = await fetch("http://143.198.108.210:8000/mcp", {
  // ...
});
```

Consider moving this to an environment variable:

```javascript
const MCP_GATEWAY_URL = process.env.MCP_GATEWAY_URL || "http://143.198.108.210:8000/mcp";
```

## Security

- All requests require authentication (via NextAuth session)
- CORS headers are not set (same-origin only)
- No rate limiting implemented (consider adding for production)
- Input validation should be added for tool arguments

## Troubleshooting

### Tools not loading

1. Check browser console for errors
2. Verify authentication is working
3. Check MCP gateway is accessible
4. Review server logs for error messages

### 404 Errors

The old REST-style endpoints (`/mcp/list_tools`, `/mcp/message`) are no longer used. All requests should go to `/api/mcp` with JSON-RPC format.

### JSON-RPC Errors

Check the error code and message in the response. Common issues:
- Invalid JSON in request body
- Missing required parameters
- MCP gateway unavailable
- Authentication failure

## Future Improvements

- [ ] Add environment variable for MCP gateway URL
- [ ] Implement request rate limiting
- [ ] Add input validation for tool arguments
- [ ] Cache tools list to reduce API calls
- [ ] Add support for streaming responses
- [ ] Implement retry logic for failed requests
- [ ] Add comprehensive error logging
- [ ] Create unit tests for API route and context
