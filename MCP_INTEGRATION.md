# MCP Integration Guide

This document provides an overview of the Model Context Protocol (MCP) integration in RAGify.

## Overview

The MCP integration allows RAGify to connect to a remote MCP gateway and interact with various tools through a chat interface. The implementation includes:

- **MCP Context Provider**: Manages connection state, tools, messages, and execution tracking
- **MCP API Route**: Handles communication with the remote gateway
- **MCP Chat Component**: User interface for chatting and seeing tool execution
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
│   │   ├── McpChat.js            # Chat interface
│   │   └── McpToolsSidebar.js    # Tools display sidebar
│   ├── contexts/
│   │   └── McpContext.js         # State management
│   └── layout.tsx                # Updated with MCP sidebar logic
├── api/
│   └── mcp/
│       └── route.js              # API endpoint for gateway communication
└── layout.tsx                    # Updated navigation with MCP link
```

### Data Flow

1. **Tool Loading**: On MCP page mount, `McpContext` fetches available tools via `GET /api/mcp`
2. **Chat Interaction**: User sends message → `McpContext.sendMessage()` → `POST /api/mcp` → Gateway processes
3. **Tool Execution**: Message may trigger tools → Gateway executes → Results returned → UI updated
4. **Real-time Updates**: `executingTools` Set tracks active executions, `toolResults` stores outcomes

## API Endpoints

### GET /api/mcp
Lists all available MCP tools from the gateway.

**Response:**
```json
{
  "tools": [
    {
      "name": "tool_name",
      "description": "Tool description",
      "inputSchema": {
        "properties": { ... },
        "required": [ ... ]
      }
    }
  ],
  "success": true
}
```

### POST /api/mcp
Handles chat messages and tool execution.

**Request (Chat):**
```json
{
  "action": "chat",
  "message": "User message",
  "history": [ ... ]
}
```

**Request (Tool Execution):**
```json
{
  "action": "executeTool",
  "toolName": "example_tool",
  "parameters": { ... }
}
```

**Response:**
```json
{
  "response": "Assistant response",
  "toolCalls": [ ... ],
  "success": true
}
```

## MCP Gateway Configuration

The integration connects to: `http://143.198.108.210:8000/mcp`

This gateway is configured in `app/api/mcp/route.js` as:
```javascript
const MCP_GATEWAY_URL = "http://143.198.108.210:8000/mcp";
```

### Gateway Endpoints Used:
- `POST /list_tools` - List available tools
- `POST /message` - Send chat message
- `POST /call_tool` - Execute specific tool

## Components

### McpContext

**Purpose**: Centralized state management for MCP functionality

**State:**
- `tools`: Array of available MCP tools
- `messages`: Chat message history
- `isConnected`: Connection status to gateway
- `isLoading`: Loading state for async operations
- `executingTools`: Set of currently executing tool names
- `toolResults`: Map of tool execution results

**Methods:**
- `fetchTools()`: Load tools from gateway
- `sendMessage(message)`: Send chat message
- `executeTool(toolName, parameters)`: Execute specific tool
- `clearMessages()`: Reset chat history
- `clearToolResults()`: Reset tool execution results

### McpChat Component

**Features:**
- Displays chat messages in conversation format
- Shows user messages on right, assistant on left
- Displays executing tools with loading indicators
- Shows tool calls as chips
- Input field with send button
- Integrates with `useNotifications` for status updates

**User Experience:**
- Empty state with welcome message
- Real-time message display
- Disabled input while processing
- Visual feedback for tool execution

### McpToolsSidebar Component

**Features:**
- Displays all available tools as cards
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

### McpPage

**Layout:**
- Page header with title and description
- Main content area with chat interface
- Right sidebar with tools (via dashboard layout)
- Responsive design following app patterns

## Navigation

The MCP page is accessible via the main navigation with:
- **Icon**: ExtensionIcon
- **Title**: MCP Gateway
- **Route**: `/mcp`

## Styling

All components follow RAGify's design patterns:
- MUI components with `sx` prop styling
- Consistent color scheme (primary, secondary, success, error)
- Responsive breakpoints
- Dark mode support via theme
- Smooth transitions and animations

## Usage Example

```javascript
import { useMcp } from '../contexts/McpContext';

function MyComponent() {
  const { tools, sendMessage, isLoading } = useMcp();
  
  const handleSend = async () => {
    try {
      await sendMessage("What tools are available?");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  
  return (
    <div>
      <p>Available tools: {tools.length}</p>
      <button onClick={handleSend} disabled={isLoading}>
        Send Message
      </button>
    </div>
  );
}
```

## Error Handling

The implementation includes comprehensive error handling:
- Network errors when connecting to gateway
- Tool execution failures
- Invalid parameters
- User notifications for all error states
- Graceful degradation when gateway is unavailable

## Future Enhancements

Potential improvements:
1. Streaming responses for long-running operations
2. Tool execution history persistence
3. Custom tool parameter input forms
4. Tool favorites/bookmarks
5. Search and filter tools
6. Export chat history
7. Tool execution analytics

## Testing

To test the MCP integration:

1. Ensure the gateway is accessible at `http://143.198.108.210:8000/mcp`
2. Navigate to `/mcp` in the app
3. View available tools in the right sidebar
4. Send messages in the chat interface
5. Observe tool execution and results

## Troubleshooting

**Tools not loading:**
- Check network connectivity to gateway
- Verify gateway URL is correct
- Check browser console for errors

**Chat not working:**
- Ensure user is authenticated
- Check API route logs
- Verify gateway is responding

**Tools not executing:**
- Check parameter format
- Verify tool exists in gateway
- Check for gateway errors in logs
