import { NextResponse } from "next/server";

// Gateway URL can be configured via environment variable
const MCP_GATEWAY_URL = process.env.MCP_GATEWAY_URL || "http://143.198.108.210:8000/mcp";

// Generate unique request ID for JSON-RPC 2.0
function generateRequestId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Make JSON-RPC 2.0 request to MCP gateway
async function makeJsonRpcRequest(method, params = {}) {
  const requestId = generateRequestId();
  
  const rpcRequest = {
    jsonrpc: "2.0",
    id: requestId,
    method,
    params,
  };

  console.log("[MCP] JSON-RPC Request:", JSON.stringify(rpcRequest, null, 2));

  const response = await fetch(MCP_GATEWAY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(rpcRequest),
  });

  if (!response.ok) {
    // Try to get response body for more details
    let errorDetails = "";
    try {
      const errorBody = await response.text();
      errorDetails = errorBody ? ` - ${errorBody}` : "";
    } catch (e) {
      // Ignore if we can't read the body
    }
    throw new Error(`MCP Gateway HTTP error: ${response.status} ${response.statusText}${errorDetails}`);
  }

  const data = await response.json();
  console.log("[MCP] JSON-RPC Response:", JSON.stringify(data, null, 2));

  // Handle JSON-RPC error responses
  if (data.error) {
    const error = new Error(data.error.message || "JSON-RPC error");
    error.code = data.error.code;
    error.data = data.error.data;
    throw error;
  }

  return data.result;
}

// POST - Handle all MCP operations via JSON-RPC 2.0
export async function POST(req) {
  try {
    const body = await req.json();
    const { method, params, id } = body;

    if (!method) {
      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id: id || null,
          error: {
            code: -32600,
            message: "Invalid Request: method is required",
          },
        },
        { status: 400 }
      );
    }

    // Proxy the JSON-RPC request to the gateway
    try {
      const result = await makeJsonRpcRequest(method, params || {});
      
      return NextResponse.json({
        jsonrpc: "2.0",
        id: id || generateRequestId(),
        result,
      });
    } catch (error) {
      console.error("[MCP] Error:", error);
      
      // Map error codes
      let errorCode = -32603; // Internal error
      if (error.code === 401 || error.message.includes("unauthorized")) {
        errorCode = -32001; // Unauthorized
      } else if (error.code) {
        errorCode = error.code;
      }

      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id: id || null,
          error: {
            code: errorCode,
            message: error.message || "Internal error",
            data: error.data,
          },
        },
        { status: errorCode === -32001 ? 401 : 500 }
      );
    }
  } catch (error) {
    console.error("[MCP] Request parsing error:", error);
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: {
          code: -32700,
          message: "Parse error",
        },
      },
      { status: 400 }
    );
  }
}
